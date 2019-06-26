const express = require('express')
const { PlayerSeason } = require('../models/player-season')

const router = new express.Router()

//index
router.get('/playerseasons', async (req, res) => {
    try {
        const playerseasons = await PlayerSeason.find({})
        res.send(playerseasons)
    } catch (e) {
        res.status(400).send('service down')
    }
})

//show
router.get('/playerseasons/:id', async (req, res) => {
    const _id = req.params.id
    try {
        // Story.findOne({ _id: 'xxxxxxx' }).populate('person', 'name age').exec(function (err, story) {
        //     console.log('Story title: ', story.title);
        //     console.log('Story creator', story.person.name);
        // });
        const ps = await PlayerSeason.findById(_id).populate('player', 'name')
        if (!ps) {
            return res.status(404).send()
        }

        res.send(ps)
    } catch (e) {
        res.status(500).send()
    }
})

// router.post('/playerseasons', async (req, res) => {
//     try {
//         const playerseasons = await Player.find({})
//         res.send(playerseasons)
//     } catch (e) {
//         res.status(400).send('service down')
//     }
// })

module.exports = router