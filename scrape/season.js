const cheerio = require('cheerio')
const request = require('request-promise')

seedMonth = async (month, yr) => {
    const results = []
    let data
    const url = 'https://www.basketball-reference.com/leagues/NBA_' + yr + '_games-' + month + '.html'
    try {
        data = await request(url)
    } catch (e) {
        return console.log(e)
    }
    const $ = cheerio.load(data)
    const tableBody = $('#schedule').children('tbody')
    tableBody.find('tr').each((index, ele) => {
        let row = {}
        $(ele).find('td').each((index, ele) => {
            let statName = $(ele).data().stat
            let statVal = $(ele).text()
            row[statName] = statVal
        })
        results.push(row)
    })
    return results
}

//go to [1229] for last game of season
seedSeason = async (yr) => {
    const months = ['october', 'november', 'december', 'january', 'february', 'march', 'april']
    let results = []
    for (let i = 0; i < months.length; i++) {
        const data = await seedMonth(months[i], yr)
        results.push(data)
    }
    results = results.flat()
    console.log(results[1229])
    return results
}


seedSeason(2019)






