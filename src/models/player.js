const mongoose = require('mongoose')

//this is a model- not a Schema?
const PlayerSeason = require('./player-season')

const schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    seasons: [PlayerSeason]
})

const Player = mongoose.model('Player', schema)

module.exports = Player

// Team:
//     name:
//     code:
//     city:
//     conference:
//     division:

    //child
//     teamSeasons[]

// TeamSeasons: 
//  {win, 
// loss, 
// roster []}

//playerSeason:
    // Player
    // team
    // games: []--- should be here?-- worst part of db for now

// boxScore:
    // playerSeason
    // game
    // stats


// player:
    // name: {}
    // currTeam: {}

    //child
    // playerSeasons: []
