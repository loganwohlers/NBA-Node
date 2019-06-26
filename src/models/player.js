const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
})

const Player = mongoose.model('Player', schema)

module.exports = Player

// Team:
//     name:
//     code:
//     city:
//     conference:
//     division:
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
    // playerSeasons: []
