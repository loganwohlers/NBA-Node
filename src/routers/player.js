const express = require('express')
const { Player } = require('../models/player')

const router = new express.Router()

//index
router.get('/players', async (req, res) => {
    try {
        let query
        if (Object.keys(req.query).length !== 0) {
            res.send(req.query)
        } else {
            const players = await Player.find({}).populate('seasons.team', 'fullName').populate('seasons.season', 'year description')
            res.send(players)
        }
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

// get /players?x=y&x2=y2 etc
//filtering w/ query string
// ?
// req.query.x

// const match = {}
// check query string and use it to fill out this match obj
//we get strings from query-- we need to check the query str and convert to whatever type we want

// limit
// populate has a match

// .populate({
//     path: 'x',
//     match: {
//         thing: 'thing to match'
//     }
// })

module.exports = router