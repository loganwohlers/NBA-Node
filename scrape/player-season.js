const cheerio = require('cheerio')
const request = require('request-promise')

// const { PlayerSeason } = require('../src/models/player-season')

scrapePlayerSeasons = async (yr) => {
    const result = []
    const url = 'https://www.basketball-reference.com/leagues/NBA_' + yr + '_per_game.html'
    let data
    try {
        data = await request(url)
    } catch (e) {
        return console.log(e)
    }
    const $ = cheerio.load(data)
    const tableBody = $('#per_game_stats').children('tbody')
    tableBody.find('tr').each((index, ele) => {
        let row = {}
        $(ele).find('td').each((index, ele) => {
            let statName = $(ele).data().stat
            let statVal = $(ele).text()
            row[statName] = statVal

        })
        result.push(row)
    })
    console.log('dnoe')
    return result
}

let x
scrapePlayerSeasons(2019).then((data) => {
    x = data
    console.log(x)
})

// seedPlayerSeasons = (arr) => {
//     const test = new PlayerSeason(arr[0])
//     test.save().then(() => {
//         console.log(test)
//     })
// }


