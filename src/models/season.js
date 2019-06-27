const mongoose = require('mongoose')

const seasonSchema = new mongoose.Schema({
    year: {
        type: Number,
        unique: true
    },
    description: {
        type: String,
        trim: true,
    }
})

const Season = mongoose.model('Season', seasonSchema)

module.exports = { Season, seasonSchema }
