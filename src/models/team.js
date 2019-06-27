const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    teamCode: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    conference: {
        type: String,
        trim: true,
    },
    division: {
        type: String,
        trim: true,
    },
    fullName: {
        type: String,
        trim: true,
    },
    name: {
        type: String,
        trim: true,
    }
})

// //helper query fn attempt
// teamSchema.query.byCode = function (code) {
//     return this.where({ teamCode: code });
// };

const Team = mongoose.model('Team', teamSchema)

module.exports = { Team, teamSchema }
