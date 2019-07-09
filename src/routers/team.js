const express = require('express')
const { Team } = require('../models/team')

const router = new express.Router()

//index
router.get('/teams', async (req, res) => {
    try {
        let query = {}
        if (Object.keys(req.query).length !== 0) {
            if (req.query.name) {
                query = {
                    "fullName": { "$regex": req.query.name, "$options": "i" }
                }
            }
        }
        const teams = await Team.find(query).populate('seasons.season', 'year description')
        res.send(teams)
    } catch (e) {
        res.status(400).send('service down')
    }
})

// show
router.get('/teams/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const team = await Team.findById(_id)
        if (!team) {
            return res.status(404).send()
        }
        res.send(team)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router