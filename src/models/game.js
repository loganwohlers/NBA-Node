const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    date: {
        type: String,
        trim: true,
        required: true
    }
})

const Game = mongoose.model('Game', schema)

module.exports = Game