const express = require('express')
const Game = require('../models/game')

const router = new express.Router()

//index
router.get('/games', async (req, res) => {
    try {
        const games = await Game.find({}).populate('home_team').populate('away_team').populate('season')
        res.send(games)
    } catch (e) {
        res.status(400).send('service down')
    }
})

//show
router.get('/games/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const game = await Game.findById(_id)
        if (!game) {
            return res.status(404).send()
        }
        res.send(game)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router