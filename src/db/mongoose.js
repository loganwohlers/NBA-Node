const mongoose = require('mongoose')
const { Player } = require('../models/player')
const { Team } = require('../models/team')
const teams = require('../../assets/teams')
const scrapePlayerSeasons = require('../../scrape/player-season')

//ip address instead of localhost
const connectionURL = 'mongodb://127.0.0.1:27017/nba-api'

//rewrite everything w/o then?
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('connected to MongoDB')

    const db = mongoose.connection.db
    //clearing out players collection for a re-seed.  not the right way to do this probably
    db.dropCollection('players')
    db.dropCollection('teams')

    Team.insertMany(teams).then(() => {
        console.log('teams seeded')
        Team.findOne({ teamCode: 'ATL' }).then(doc => {
            console.log(doc)
        })
    }).catch(e => console.log(e))




    //the .then here should be it's own fn-- maybe create arr of players and then do a mass insertMany?
    //need to stop dupe players-- want them to just update their seasons
    // scrapePlayerSeasons(2019).then(async (dd) => {
    //     data = dd.filter(d => d.player)
    //     for (let i = 0; i < 3; i++) {
    //         let name = data[i].player
    //         console.log(name)

    //         let player = new Player({
    //             name
    //         })
    //         //don't need this at all? probably want to modify it a bit?
    //         let obj = { ...data[i] }
    //         let teamCode = obj.team_id
    //         Team.findOne({ teamCode }, (err, t) => {
    //             if (err) {
    //                 console.log('error?')
    //                 return err
    //             }
    //             console.log(obj.teamCode)
    //             obj.teamCode = t._id
    //             player.seasons.push(obj)
    //             player.save()
    //         })
    //     }
    //     console.log('seeded players/seasons')
    // }).catch(e => {
    //     console.log(e)
    // })
}).catch(e => console.log(e))

