const mongoose = require('mongoose')

const { Player, Team, Season, Game, GameBox } = require('../models')

const teams = require('../../assets/teams')
const scrapePlayerSeasons = require('../../scrape/player-season')
const { getBoxScores } = require('../../scrape/gameBox')
const scrapeSeason = require('../../scrape/season')

//ip address instead of localhost
const URL = 'mongodb://127.0.0.1:27017/nba-api'

seedDB = async (connectionURL) => {
    try {
        await mongoose.connect(connectionURL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
    } catch (e) {
        return console.log(e)
    }
    console.log('connected to db!!')
    const db = mongoose.connection.db

    //mass destoying all docs while seeds are tested
    db.dropCollection('players')
    db.dropCollection('games')
    db.dropCollection('gamebox')
    db.dropCollection('seasons')

    // db.dropCollection('teams')
    // await seedTeams()

    await seedSeasonData(2019)
    console.log('db seeded')
}

seedSeasonData = async (year) => {
    let season
    let description = (year - 1) + '-' + year + ' NBA Season'
    try {
        season = new Season({ year, description })
        season.save()
    } catch (e) {
        return console.log(e)
    }
    await seedPlayers(season)
    await seedSchedule(season)
}

seedSchedule = async (season) => {
    let seasonData
    console.log('seeding games')
    try {
        seasonData = await scrapeSeason(season.year)
    } catch (e) {
        return console.log(e)
    }

    let dataObj = [...seasonData]
    //for testing just seeding first 50 games
    for (let i = 0; i < 50; i++) {
        let { home_team_name, visitor_team_name } = dataObj[i]
        let homeTeam = await Team.findOne({ fullName: home_team_name })
        let awayTeam = await Team.findOne({ fullName: visitor_team_name })

        let box = await getBoxScores(dataObj[i])
        let newBox = await convertBoxRefs(box)
        let gameBox = new GameBox(newBox)
        gameBox.save()

        dataObj[i].home_team = homeTeam._id
        dataObj[i].away_team = awayTeam._id
        dataObj[i].season = season._id
        dataObj[i].box_scores = gameBox._id
        console.log(i)
    }
    try {
        let sample = dataObj.slice(0, 50)
        let saved = await Game.insertMany(sample)
        console.log('seeded games/boxscores!')
    } catch (e) {
        return console.log(e)
    }
}

//replacing all player names in each w/ a reference to the actual player model
convertBoxRefs = async ({ homeBasicBox, homeAdvancedBox, awayBasicBox, awayAdvancedBox }) => {
    homeBasicBox = await convertSingleBox(homeBasicBox)
    homeAdvancedBox = await convertSingleBox(homeAdvancedBox)
    awayBasicBox = await convertSingleBox(awayBasicBox)
    awayAdvancedBox = await convertSingleBox(awayAdvancedBox)
    return {
        homeBasicBox,
        homeAdvancedBox,
        awayBasicBox,
        awayAdvancedBox
    }
}

//takes an array of a boxscore and returns a new array w/ all player names replaced by their actual document id that was seeded earlier
convertSingleBox = async (box) => {
    let newBox = box.map(async (pl) => {
        let playerID = await convertPlayerToID(pl.player)
        return { ...pl, player: playerID }
    })
    return Promise.all(newBox)
}

//takes a player name and returns their document id-- if there is no document then one is created-- this happens when a player appears in a boxscore but not on the end of season stats list
convertPlayerToID = async (name) => {
    let player = await Player.findOne({ name })
    if (player) {
        return player._id
    } else {
        let newPlayer = new Player({ name })
        newPlayer.save()
        return newPlayer._id
    }
}

//uses the hardcoded info on all 30 teams and turns them into Team documents
seedTeams = async () => {
    try {
        await Team.insertMany(teams)
        console.log('teams seeded')
    } catch (e) {
        return console.log(e)
    }
}

//season doc should just be passed in
seedPlayers = async (season) => {
    let scrapedData
    console.log('seeding players')
    try {
        scrapedData = await scrapePlayerSeasons(season.year)
        console.log('player data scraped')
    } catch (e) {
        return console.log(e)
    }
    let data = scrapedData.filter(d => d.player)
    for (let i = 0; i < data.length; i++) {
        let name = data[i].player

        //this is a strange mongo thing-- it doesn't like when you work with the same
        //doc multiple times in a row?  by doing a new query here for nothing the program
        //works as expected*****fix
        let players = await Player.findOne({})

        //checking for if this player document exists- if not create new player 
        let player = await Player.findOne({ name })
        if (!player) {
            player = new Player({
                name
            })
        }
        // creating the object that represents a played season and adding it to players seasons array
        let obj = { ...data[i] }
        if (obj.team_id !== 'TOT') {
            let team = await Team.findOne({ teamCode: obj.team_id })
            if (team) {
                obj.team = team._id
                obj.season = season._id
                player.seasons.push(obj)
                player.save()
            } else {
                return console.log('could not find team code')
            }
        }
    }
    console.log('players seeded')
}



seedDB(URL)
