const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    date: {
        type: String,
        trim: true,
        required: true
    }
})
//teams,score, time, location,  boxscore [] of lines

const Game = mongoose.model('Game', schema)

module.exports = Game