const mongoose = require('mongoose')
const Player = require('../models/player')

const scrapePlayerSeasons = require('../../scrape/player-season')

//ip address instead of localhost
const connectionURL = 'mongodb://127.0.0.1:27017/nba-api'

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    const db = mongoose.connection.db
    db.dropCollection('players')
    console.log('connected to MongoDB')
    scrapePlayerSeasons(2019).then(dd => {
        data = dd.filter(d => d.player)
        console.log(data.length)
        for (let i = 0; i < data.length; i++) {
            let name = data[i].player
            if (name) {
                let player = new Player({
                    name
                })
                player.save()
            }
        }
        console.log('seeded names')
    }).catch(e => {
        console.log(e)
    })
    //seed here?

}).catch(e => console.log(e))

