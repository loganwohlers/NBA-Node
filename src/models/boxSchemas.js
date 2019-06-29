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

module.exports = { basicBoxScehma, advancedBoxScehma }

// let advanced = {
//     player: 'Terry Rozier',
//     mp: '26:31',
//     ts_pct: '.550',
//     efg_pct: '.550',
//     fg3a_per_fga_pct: '.200',
//     fta_per_fga_pct: '.000',
//     orb_pct: '0.0',
//     drb_pct: '29.6',
//     trb_pct: '14.2',
//     ast_pct: '5.5',
//     stl_pct: '0.0',
//     blk_pct: '3.0',
//     tov_pct: '9.1',
//     usg_pct: '17.0',
//     off_rtg: '102',
//     def_rtg: '84'
// }

// mp: '29:57',
//     fg: '4',
//         fga: '7',
//             fg_pct: '.571',
//                 fg3: '0',
//                     fg3a: '1',
//                         fg3_pct: '.000',
//                             ft: '1',
//                                 fta: '1',
//                                     ft_pct: '1.000',
//                                         orb: '0',
//                                             drb: '4',
//                                                 trb: '4',
//                                                     ast: '2',
//                                                         stl: '0',
//                                                             blk: '4',
//                                                                 tov: '3',
//                                                                     pf: '1',
//                                                                         pts: '9',
//                                                                             plus_minus: '+9'