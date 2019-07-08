const express = require('express')
const Game = require('../models/game')

const router = new express.Router()

//index
router.get('/games', async (req, res) => {
    try {
        let query = {}
        if (Object.keys(req.query).length !== 0) {
            if (req.query.season) {
                query = {
                    "name": { "$regex": req.query.name, "$options": "i" }
                }
            }
        }
        // game query by season-- by team(s)

        const games = await Game.find({}).populate('home_team', 'teamCode city fullName conference division').populate('away_team', 'teamCode city fullName conference division').populate('season', 'year description').limit(50)
        res.send(games)

    } catch (e) {
        res.status(400).send('service down')
    }

})

//show
router.get('/games/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const game = await Game.findById(_id).populate('home_team').populate('away_team').populate('season')
            .populate(
                {
                    path: 'box_scores',
                    populate: {
                        path: 'homeBasicBox.player',
                        model: 'Player',
                        select: 'name'
                    }
                })
            .populate(
                {
                    path: 'box_scores',
                    populate: {
                        path: 'homeAdvanced.player',
                        model: 'Player',
                        select: 'name'
                    }
                })
            .populate(
                {
                    path: 'box_scores',
                    populate: {
                        path: 'awayBasicBox.player',
                        model: 'Player',
                        select: 'name'
                    }
                })
            .populate(
                {
                    path: 'box_scores',
                    populate: {
                        path: 'awayAdvancedBox.player',
                        model: 'Player',
                        select: 'name'
                    }
                })
        if (!game) {
            return res.status(404).send()
        }
        res.send(game)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router