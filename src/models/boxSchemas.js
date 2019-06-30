const mongoose = require('mongoose')

const basicBoxScehma = new mongoose.Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    mp: {
        type: String,
        trim: true,
    },
    fg: {
        type: String,
        trim: true,
    },
    fga: {
        type: String,
        trim: true,
    },
    fga_pct: {
        type: String,
        trim: true,
    },
    fg3: {
        type: String,
        trim: true,
    },
    fg3a: {
        type: String,
        trim: true,
    },
    fg3_pct: {
        type: String,
        trim: true,
    },
    ft: {
        type: String,
        trim: true,
    },
    fta: {
        type: String,
        trim: true,
    },
    ft_pct: {
        type: String,
        trim: true,
    },
    orb: {
        type: String,
        trim: true,
    },
    drb: {
        type: String,
        trim: true,
    },
    trb: {
        type: String,
        trim: true,
    },
    ast: {
        type: String,
        trim: true,
    },
    stl: {
        type: String,
        trim: true,
    },
    blk: {
        type: String,
        trim: true,
    },
    tov: {
        type: String,
        trim: true,
    },
    pf: {
        type: String,
        trim: true,
    },
    pts: {
        type: String,
        trim: true,
    },
    plus_minus: {
        type: String,
        trim: true,
    },
    dnp: {
        type: Boolean
    }
})

const advancedBoxScehma = new mongoose.Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    mp: {
        type: String,
        trim: true,
    },
    ts_pct: {
        type: String,
        trim: true,
    },
    efg_pct: {
        type: String,
        trim: true,
    },
    fg3a_per_fga_pct: {
        type: String,
        trim: true,
    },
    fta_per_fga_pct: {
        type: String,
        trim: true,
    },
    orb_pct: {
        type: String,
        trim: true,
    },
    drb_pct: {
        type: String,
        trim: true,
    },
    trb_pct: {
        type: String,
        trim: true,
    },
    ast_pct: {
        type: String,
        trim: true,
    },
    stl_pct: {
        type: String,
        trim: true,
    },
    blk_pct: {
        type: String,
        trim: true,
    },
    tov_pct: {
        type: String,
        trim: true,
    },
    usg_pct: {
        type: String,
        trim: true,
    },
    off_rtg: {
        type: String,
        trim: true,
    },
    def_rtg: {
        type: String,
        trim: true,
    }
})

const allBoxSchmea = new mongoose.Schema({
    homeBasicBox: [basicBoxScehma],
    homeAdvancedBox: [advancedBoxScehma],
    awayBasicBox: [basicBoxScehma],
    awayAdvancedBox: [advancedBoxScehma],
})


const GameBox = mongoose.model('GameBox', allBoxSchmea)

module.exports = { basicBoxScehma, advancedBoxScehma, GameBox }
