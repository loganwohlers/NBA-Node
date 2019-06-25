const cheerio = require('cheerio')
// const tableParser = require('cheerio-tableparser')
const request = require('request')
// const url = 'https://www.basketball-reference.com/leagues/NBA_2019_per_game.html'

const url = 'https://www.basketball-reference.com/leagues/NBA_2019_per_game.html'
request(url, (err, res, html) => {
    if (!err && res.statusCode === 200) {
        const $ = cheerio.load(html)
        const tableBody = $('#per_game_stats').children('tbody')

        // .children('tbody')
        //fulltable
        // console.log(tableBody.find('tr').find('td').first().text())
        // tableBody.find('tr').each((index) => {
        //     console.log($(this).html())
        // })
        tableBody.find('tr').each((index, ele) => {
            console.log($(ele).find('td').first().text())
        })

    }
})