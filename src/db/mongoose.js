const mongoose = require('mongoose')
const { Player } = require('../models/player')
const { PlayerSeason } = require('../models/player-season')

const scrapePlayerSeasons = require('../../scrape/player-season')

//ip address instead of localhost
const connectionURL = 'mongodb://127.0.0.1:27017/nba-api'

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('connected to MongoDB')

    const db = mongoose.connection.db
    //clearing out players collection for a re-seed.  not the right way to do this probably
    db.dropCollection('players')

    //the .then here should be it's own fn-- also might want to try insertMany
    //need to stop dupe players-- want them to just update their seasons
    scrapePlayerSeasons(2019).then(dd => {
        data = dd.filter(d => d.player)
        for (let i = 0; i < data.length; i++) {
            let name = data[i].player
            console.log(name)
            let player = new Player({
                name
            })
            let obj = { ...data[i], player: player._id }
            player.seasons.push(obj)
            player.save()
        }
        console.log('seeded players/ps')
    }).catch(e => {
        console.log(e)
    })
}).catch(e => console.log(e))

