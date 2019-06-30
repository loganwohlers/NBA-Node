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

    // db.dropCollection('players')
    db.dropCollection('games')
    db.dropCollection('gamebox')

    // db.dropCollection('seasons')
    // console.log('seeding season')
    // await seedSeason()

    // db.dropCollection('teams')
    // console.log('seeding teams')
    // await seedTeams()

    // console.log('seeding players')
    // await seedPlayers(2019)
    console.log('seeding games')
    await seedSchedule(2019)
    console.log('db seeded')
}

seedSchedule = async (yr) => {
    let seasonData
    let season
    try {
        seasonData = await scrapeSeason(2019)
        season = await Season.findOne({ year: yr })
    } catch (e) {
        return console.log(e)
    }

    let dataObj = [...seasonData]
    for (let i = 0; i < 1; i++) {
        let { home_team_name, visitor_team_name } = dataObj[i]
        let homeTeam = await Team.findOne({ fullName: home_team_name })
        let awayTeam = await Team.findOne({ fullName: visitor_team_name })

        //here is where we create the gameBox
        let box = await getBoxScores(dataObj[i])

        //need to convert 
        console.log(box.homeBoxScores.basic)

        console.log(box.homeBoxScores.advanced)
        // let gb = new GameBox({
        //     homeBasicBox: box.homeBoxScores.basic,
        //     homeAdvancedBox: box.homeBoxScores.advanced,
        //     awayBasicBox: box.awayBoxScores.advanced,
        //     awayAdvancedBox: box.awayBoxScores.advanced
        // })

        // console.log(gb)

        dataObj[i].home_team = homeTeam._id
        dataObj[i].away_team = awayTeam._id
        dataObj[i].season = season._id
        console.log(i)
    }
    try {
        let saved = await Game.insertMany(dataObj)
    } catch (e) {
        return console.log(e)
    }

}

seedTeams = async () => {
    try {
        await Team.insertMany(teams)
        console.log('teams seeded')
    } catch (e) {
        return console.log(e)
    }
}

convertBoxtoModels = async(scrapedBoxes)

seedPlayers = async (yr) => {
    //the .then here should be it's own fn-- maybe create arr of players and then do a mass insertMany?
    //need to stop dupe players-- want them to just update their seasons
    let scrapedData
    let season
    try {
        scrapedData = await scrapePlayerSeasons(yr)
        season = await Season.findOne({ year: yr })
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

        let player = await Player.findOne({ name })
        //checking for if this player exists
        if (!player) {
            player = new Player({
                name
            })
        }
        let obj = { ...data[i] }
        //TOT=Total Over Teams-- average stats of one player across multiple teams in a season
        //might add later but not now
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
}

seedSeason = async () => {
    try {
        let season = new Season({ year: 2019, description: '2018-2019 NBA Season' })
        return season.save()
    } catch (e) {
        return console.log(e)
    }
}

// seedRandom(URL)
// seedTeams(URL)

seedDB(URL)
