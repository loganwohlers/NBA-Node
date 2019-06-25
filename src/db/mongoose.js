const mongoose = require('mongoose')
const connectionURL = 'mongodb://127.0.0.1:27017/nba-api'

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('connected properly')
    // const db = mongoose.connection.db
}).catch(e => console.log(e))
