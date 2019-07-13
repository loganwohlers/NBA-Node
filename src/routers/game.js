const express = require('express')
const Game = require('../models/game')

const router = new express.Router()

//index
router.get('/games', async (req, res) => {
    try {
        let match = {}
        let query = false
        let games
        if (Object.keys(req.query).length !== 0) {
            const { season } = req.query
            if (season) {
                query = true
                match = {
                    "year": parseInt(season)
                }
            }
        }
        games = await Game.find({}).populate('home_team', 'teamCode city fullName conference division').populate('away_team', 'teamCode city fullName conference division').populate({
            path: 'season',
            match,
            select: 'year description'
        }
        ).populate('season')
            .populate(
                {
                    path: 'box_scores.homeBasicBox.player',
                    model: 'Player',
                    select: 'name'
                }
            )
            .populate(
                {
                    path: 'box_scores.homeAdvancedBox.player',
                    model: 'Player',
                    select: 'name'
                }
            )
            .populate(
                {
                    path: 'box_scores.awayBasicBox.player',
                    model: 'Player',
                    select: 'name'
                }
            )
            .populate(
                {
                    path: 'box_scores.awayAdvancedBox.player',
                    model: 'Player',
                    select: 'name'
                }
            )
        if (query) {
            games = games.filter(game => game.season)
        }
        res.send(games)

    } catch (e) {
        res.status(400).send(e)
    }

})

//show
router.get('/games/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const game = await Game.findById(_id).populate('home_team', 'teamCode city fullName conference division').populate('away_team', 'teamCode city fullName conference division').populate('season')
            .populate(
                {
                    path: 'box_scores.homeBasicBox.player',
                    model: 'Player',
                    select: 'name'
                }
            )
            .populate(
                {
                    path: 'box_scores.homeAdvancedBox.player',
                    model: 'Player',
                    select: 'name'
                }
            )
            .populate(
                {
                    path: 'box_scores.awayBasicBox.player',
                    model: 'Player',
                    select: 'name'
                }
            )
            .populate(
                {
                    path: 'box_scores.awayAdvancedBox.player',
                    model: 'Player',
                    select: 'name'
                }
            )

        if (!game) {
            return res.status(404).send()
        }
        res.send(game)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router