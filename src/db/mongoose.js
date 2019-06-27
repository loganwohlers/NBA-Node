const mongoose = require('mongoose')
const { Player } = require('../models/player')
const { Team } = require('../models/team')
const teams = require('../../assets/teams')
const scrapePlayerSeasons = require('../../scrape/player-season')

//ip address instead of localhost
const URL = 'mongodb://127.0.0.1:27017/nba-api'

seedTeams = async (connectionURL) => {
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
    db.dropCollection('teams')

    try {
        await Team.insertMany(teams)
        console.log('teams seeded')
    } catch (e) {
        return console.log(e)
    }


}
//rewrite everything w/o then?
dbSetUp = async (connectionURL) => {
    try {
        await mongoose.connect(connectionURL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
    } catch (e) {
        return console.log(e)
    }
    console.log('connected to MongoDB')

    //could split this off as it's own async fn-- that uses the connect as a paramter?  not sure if that's allowed
    const db = mongoose.connection.db
    //clearing out players collection for a re-seed.  not the right way to do this probably
    db.dropCollection('players')

    //the .then here should be it's own fn-- maybe create arr of players and then do a mass insertMany?
    //need to stop dupe players-- want them to just update their seasons
    let scrapedData
    try {
        scrapedData = await scrapePlayerSeasons(2019)
    } catch (e) {
        return console.log(e)
    }
    let data = scrapedData.filter(d => d.player)
    for (let i = 0; i < 3; i++) {
        let name = data[i].player
        console.log(name)
        let player = new Player({
            name
        })
        let obj = { ...data[i] }
        console.log(obj.team_id)
        let team = await Team.findOne({ teamCode: obj.team_id })
        if (team) {
            obj.teamCode = team._id
            player.seasons.push(obj)
            player.save()
        } else {
            return console.log('could not find team code')
        }
    }
    console.log('seeded players/seasons')
}

// seedTeams(URL)
dbSetUp(URL)