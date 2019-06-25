const cheerio = require('cheerio')
const request = require('request')
// const url = 'https://www.basketball-reference.com/leagues/NBA_2019_per_game.html'

const url = 'https://www.basketball-reference.com/leagues/NBA_2019_per_game.html'
request(url, (err, res, html) => {
    if (!err && res.statusCode === 200) {
        const $ = cheerio.load(html)
        const table = $('#div_per_game_stats')
        console.log(table.html())
    }
})