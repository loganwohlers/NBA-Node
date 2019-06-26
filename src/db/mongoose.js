const mongoose = require('mongoose')
const Player = require('../models/player')

//ip address instead of localhost
const connectionURL = 'mongodb://127.0.0.1:27017/nba-api'

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('connected to MongoDB')
    const lebron = new Player({
        name: 'Lebron James'
    })
    lebron.save()
    //seed here?
    // const db = mongoose.connection.db
}).catch(e => console.log(e))

