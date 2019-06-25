const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    player: {
        type: String,
        trim: true,
        required: true
    },
    age: {
        type: Number,
        default: 18
    }

})

const PlayerSeason = mongoose.model('PlayerSeason', schema)

module.exports = PlayerSeason