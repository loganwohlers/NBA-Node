const express = require('express')
const { GameBox } = require('../models/gameBox')

const router = new express.Router()

//index
router.get('/gameboxes', async (req, res) => {
    try {
        const boxes = await Player.find({}).populate('seasons.team').populate('seasons.season', 'year description')
        res.send(boxes)
    } catch (e) {
        res.status(400).send('service down')
    }
})

//show
router.get('/gameboxes/:id', async (req, res) => {
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