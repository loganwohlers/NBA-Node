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
    box_scores: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GameBox',
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

const Game = mongoose.model('Game', gameSchema)

module.exports = Game