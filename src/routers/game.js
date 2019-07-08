const express = require('express')
const Game = require('../models/game')

const router = new express.Router()

//index
router.get('/games', async (req, res) => {
    try {
        let match = {}
        let games
        if (Object.keys(req.query).length !== 0) {
            const { season, team, team2 } = req.query
            if (season) {
                match = {
                    "year": parseInt(season)
                }
            }
            games = await Game.find({}).populate({
                path: 'season',
                match
            })
            games = games.filter(game => game.season)
            // query = {
            //     "name": { "$regex": req.query.name, "$options": "i" }
            // }
            // null, { tagName: { $in: ['funny', 'politics'] } } )
            res.send(games)
            // .populate('home_team', 'teamCode city fullName conference division').populate('away_team', 'teamCode city fullName conference division').populate('season', 'year description')
        } else {
            games = await Game.find({}).populate('home_team', 'teamCode city fullName conference division').populate('away_team', 'teamCode city fullName conference division').populate('season', 'year description').limit(50)
        }
        // const gamesData = await Game.find(query).populate('home_team', 'teamCode city fullName conference division').populate('away_team', 'teamCode city fullName conference division').populate('season', 'year description').limit(50)
        res.send(games)

    } catch (e) {
        res.status(400).send(e)
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