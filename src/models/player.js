const mongoose = require('mongoose')

const playerSeasonSchema = new mongoose.Schema({
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    },
    age: {
        type: String,
        default: 18
    },
    g: {
        type: String,
        default: 0
    },
    gs: {
        type: String,
        default: 0
    },
    pos: {
        type: String,
        default: 0
    },
    fg2_per_g: {
        type: String,
        default: 0
    },
    fg2a_per_g: {
        type: String,
        default: 0
    },
    fg2_pct: {
        type: String,
        default: 0
    },
    trb_per_g: {
        type: String,
        default: 0
    },
    mp_per_g: {
        type: String,
        default: 0
    },
    fg_per_g: {
        type: String,
        default: 0
    },
    fga_per_g: {
        type: String,
        default: 0
    },
    fg_pct: {
        type: String,
        default: 0
    },
    fg3_per_g: {
        type: String,
        default: 0
    },
    fg3a_per_g: {
        type: String,
        default: 0
    },
    fg3_pct: {
        type: String,
        default: 0
    },
    efg_pct: {
        type: String,
        default: 0
    },
    ft_per_g: {
        type: String,
        default: 0
    },
    fta_per_g: {
        type: String,
        default: 0
    },
    ft_pct: {
        type: String,
        default: 0
    },
    orb_per_g: {
        type: String,
        default: 0
    },
    drb_per_g: {
        type: String,
        default: 0
    },
    ast_per_g: {
        type: String,
        default: 0
    },
    stl_per_g: {
        type: String,
        default: 0
    },
    blk_per_g: {
        type: String,
        default: 0
    },
    tov_per_g: {
        type: String,
        default: 0
    },
    pf_per_g: {
        type: String,
        default: 0
    },
    pts_per_g: {
        type: String,
        default: 0
    },

})

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
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
// ____________________
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


