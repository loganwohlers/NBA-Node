const mongoose = require('mongoose')

const schema = new mongoose.Schema({
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
//teams,score, time, location,  boxscore [] of lines

const Game = mongoose.model('Game', schema)

module.exports = Game