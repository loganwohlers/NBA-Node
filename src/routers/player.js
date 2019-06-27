const express = require('express')
const { Player } = require('../models/player')

const router = new express.Router()

//index
router.get('/players', async (req, res) => {
    try {
        const players = await Player.find({}).populate('seasons.team_id')
        res.send(players)
    } catch (e) {
        res.status(400).send('service down')
    }
})

//show
router.get('/players/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const player = await Player.findById(_id)
        if (!player) {
            return res.status(404).send()
        }
        res.send(player)
    } catch (e) {
        res.status(500).send()
    }
})



module.exports = router