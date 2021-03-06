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
    fg: {
        type: String,
        default: 0
    },
    fga: {
        type: String,
        default: 0
    },
    fg_pct: {
        type: String,
        default: 0
    },
    fg2: {
        type: String,
        default: 0
    },
    fg2a: {
        type: String,
        default: 0
    },
    fg2_pct: {
        type: String,
        default: 0
    },

    fg3: {
        type: String,
        default: 0
    },
    fg3a: {
        type: String,
        default: 0
    },
    fg3_pct: {
        type: String,
        default: 0
    },
    ft: {
        type: String,
        default: 0
    },
    fta: {
        type: String,
        default: 0
    },
    ft_pct: {
        type: String,
        default: 0
    },
    orb: {
        type: String,
        default: 0
    },
    drb: {
        type: String,
        default: 0
    },
    trb: {
        type: String,
        default: 0
    },
    ast: {
        type: String,
        default: 0
    },
    stl: {
        type: String,
        default: 0
    },
    blk: {
        type: String,
        default: 0
    },
    tov: {
        type: String,
        default: 0
    },
    pf: {
        type: String,
        default: 0
    },
    pts: {
        type: String,
        default: 0
    }
})

const teamSeasonSchema = new mongoose.Schema({
    season: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Season',
    },
    madePlayoffs: {
        type: Boolean,
        default: null
    },
    teamPerGameStats: statsSchema,
    opponentPerGameStats: statsSchema

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
