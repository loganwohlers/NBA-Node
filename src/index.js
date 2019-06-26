const express = require('express')

//we don't HAVE to save this to a variable- when we require here 
//it still runs this file-- which is where we connect to our db 
require('./db/mongoose')

const { playerRouter, playerSeasonsRouter } = require('./routers')

const app = express()
const port = process.env.PORT || 3000

//this sets up auto-parsing on requests
app.use(express.json())

//router we want to use
app.use(playerRouter)
app.use(playerSeasonsRouter)

//run the server
app.listen(port, () => {
    console.log('server up on port', port)
})