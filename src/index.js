const express = require('express')

//we don't HAVE to save this to a variable- when we require here 
//it still runs this file-- which is where we connect to our db 
require('./db/mongoose')

const { playerRouter, gameRouter, gameBoxRouter } = require('./routers')

const app = express()
const port = process.env.PORT || 3000

//this sets up auto-parsing on requests
app.use(express.json())

const router = new express.Router()

//routers we want to use
app.use(router)
app.use(playerRouter)
app.use(gameBoxRouter)
app.use(gameRouter)

//dummy router for homepage
router.get('/', async (req, res) => {
    try {
        res.send('HOMEPAGE!!')
    } catch (e) {
        res.status(400).send('service down')
    }
})


//run the server
app.listen(port, () => {
    console.log('server up on port', port)
})