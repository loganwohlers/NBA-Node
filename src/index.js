const express = require('express')

require('./db/pg')

const { playerRouter, gameRouter, teamRouter } = require('./routers')

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

const router = new express.Router()

//routers to use
app.use(router)
app.use(playerRouter)
app.use(gameRouter)
app.use(teamRouter)

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