const express = require('express')

//we don't HAVE to save this to a variable- when we require here 
//it still runs this file-- which is where we connect to our db 
require('./db/mongoose')

const playerRouter = require('./routers/player')

const app = express()
const port = process.env.PORT || 3000

const testRouter = new express.Router()

//this sets up auto-parsing on requests
app.use(express.json())

testRouter.get('/', async (req, res) => {
    res.send('home')
})

testRouter.get('/test', async (req, res) => {
    res.send('test')
})

app.use(testRouter)
app.use(playerRouter)

//run the server
app.listen(port, () => {
    console.log('server up on port', port)
})