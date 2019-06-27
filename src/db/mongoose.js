const mongoose = require('mongoose')
const { Player, Team, Season } = require('../models')
const teams = require('../../assets/teams')
const scrapePlayerSeasons = require('../../scrape/player-season')

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
    const db = mongoose.connection.db
    db.dropCollection('players')
    // db.dropCollection('teams')

    // await seedTeams()
    await seedPlayers(2019)
    console.log('db seeded')
}

seedTeams = async () => {
    try {
        await Team.insertMany(teams)
        console.log('teams seeded')
    } catch (e) {
        return console.log(e)
    }
}

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

seedRandom = async (connectionURL) => {
    try {
        await mongoose.connect(connectionURL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
    } catch (e) {
        return console.log(e)
    }

    // const db = mongoose.connection.db
    // db.dropCollection('teams')

    try {
        let season = new Season({ year: 2019, description: '2018-2019 NBA Season' })
        season.save()
    } catch (e) {
        return console.log(e)
    }
}

// seedRandom(URL)
// seedTeams(URL)

seedDB(URL)
