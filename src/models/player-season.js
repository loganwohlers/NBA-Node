const mongoose = require('mongoose')

const playerSeasonSchema = new mongoose.Schema({
    player: {
        type: String,
        default: 0
    },
    player_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    team_id: {
        type: String,
        default: 0
    },
    age: {
        type: String,
        default: 18
    },
    gp: {
        type: String,
        default: 0
    },
    position: {
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

const PlayerSeason = mongoose.model('PlayerSeason', playerSeasonSchema)

module.exports = { PlayerSeason, playerSeasonSchema }

