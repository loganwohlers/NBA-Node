const mongoose = require('mongoose')
const Player = require('../models/player')
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
    db.dropCollection('playerseasons')

    //the .then here should be it's own fn-- also might want to try insertMany
    scrapePlayerSeasons(2019).then(dd => {
        data = dd.filter(d => d.player)
        console.log(data.length, data[0])
        for (let i = 0; i < 1; i++) {
            let name = data[i].player
            let player = new Player({
                name
            })
            player.save()
            let obj = { ...data[i], player_id: player._id }
            console.log(obj)
            PlayerSeason.create(obj).then(() => console.log('made ps?'))
        }
        console.log('seeded names')
        // PlayerSeason.insertMany(data).then(() => console.log('seeded ps ?'))

    }).catch(e => {
        console.log(e)
    })
}).catch(e => console.log(e))

