const mongoose = require('mongoose')

const statsSchema = new mongoose.Schema({
    g: {
        type: String,
        default: 0
    },
    mp: {
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
    trb_per_g: {
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
    madePlayoffs: {
        type: Boolean,
        default: null
    },
    pts_per_g: {
        type: String,
        default: 0
    }
})

const teamSeasonSchema = new mongoose.Schema({
    season: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Season',
    },
    teamStats: statsSchema,
    // opponentStats: statsSchema

})

const teamSchema = new mongoose.Schema({
    teamCode: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    conference: {
        type: String,
        trim: true,
    },
    division: {
        type: String,
        trim: true,
    },
    fullName: {
        type: String,
        trim: true,
    },
    name: {
        type: String,
        trim: true,
    },
    seasons: [teamSeasonSchema]
})



const Team = mongoose.model('Team', teamSchema)

module.exports = { Team, teamSchema }
