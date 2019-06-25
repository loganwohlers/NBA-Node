const express = require('express')
const Player = require('../models/player')

const router = new express.Router()

router.get('/players', async (req, res) => {
    try {
        const players = await Player.find({})
        res.send(players)
    } catch (e) {
        res.status(400).send('service down')
    }
})

module.exports = router