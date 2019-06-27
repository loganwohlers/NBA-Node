const mongoose = require('mongoose')
const { PlayerSeason, playerSeasonSchema } = require('./player-season')

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    seasons: [playerSeasonSchema]
})

const Player = mongoose.model('Player', playerSchema)

module.exports = { Player, playerSchema }

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
