const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
})

const Player = mongoose.model('Player', schema)

module.exports = Player