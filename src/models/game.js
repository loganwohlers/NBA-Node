const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    gameCode: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        type: String,
        trim: true,
    },
    game_start_time: {
        type: String,
        trim: true,
    },
    away_team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    },
    visitor_pts: {
        type: String,
        trim: true,
    },
    home_team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    },
    home_pts: {
        type: String,
        trim: true,
    },
    overtimes: {
        type: String,
        trim: true,
    },
    attendance: {
        type: String,
        trim: true,
    },
    game_remarks: {
        type: String,
        trim: true,
    },
    season: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Season',
    },


})

const boxSchema = new mongoose.Schema({

})


// GameLine.create!(
//     player_season_id: ps.id,
//     mp: gameline[1]['mp'],
//     fg: gameline[1]['fg'],
//     fga: gameline[1]['fga'],
//     fg_pct: gameline[1]['fg_pct'],
//     fg3: gameline[1]['fg3'],
//     fg3a: gameline[1]['fg3a'],
//     fg3_pct: gameline[1]['fg3_pct'],
//     ft: gameline[1]['ft'],
//     fta: gameline[1]['fta'],
//     ft_pct: gameline[1]['ft_pct'],
//     orb: gameline[1]['orb'],
//     drb: gameline[1]['drb'],
//     trb: gameline[1]['trb'],
//     ast: gameline[1]['ast'],
//     stl: gameline[1]['stl'],
//     blk: gameline[1]['blk'],
//     tov: gameline[1]['tov'],
//     pf: gameline[1]['pf'],
//     pts: gameline[1]['pts'],
//     plus_minus: gameline[1]['plus_minus'],
//     dnp: false
// )


const Game = mongoose.model('Game', gameSchema)

module.exports = Game