const cheerio = require('cheerio')
// const tableParser = require('cheerio-tableparser')
const request = require('request')
// const url = 'https://www.basketball-reference.com/leagues/NBA_2019_per_game.html'


const data = []

const url = 'https://www.basketball-reference.com/leagues/NBA_2019_per_game.html'
request(url, (err, res, html) => {
    if (!err && res.statusCode === 200) {
        const $ = cheerio.load(html)
        const tableBody = $('#per_game_stats').children('tbody')

        tableBody.find('tr').each((index, ele) => {
            let row = []
            $(ele).find('td').each((index, ele) => {
                row.push($(ele).text())
            })
            data.push(row)

        })
        console.log(data)

    }
})

