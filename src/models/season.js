const mongoose = require('mongoose')

const seasonSchema = new mongoose.Schema({
    year: {
        type: Number,
    },
    description: {
        type: String,
        trim: true,
    }
})

const Season = mongoose.model('Season', seasonSchema)

module.exports = { Season, seasonSchema }
