const cheerio = require('cheerio')
const request = require('request-promise')
const teams = require('../assets/teams')
const { Team } = require('../src/models/team')

scrapeTeamSeasons = async (yr) => {
    const result = []
    const url = 'https://www.basketball-reference.com/leagues/NBA_' + yr + '.html'
    const testURL = 'https://www.basketball-reference.com/leagues/NBA_2019.html'
    let data
    try {
        data = await request(testURL)
        console.log('loaded?')
    } catch (e) {
        return console.log(e)
    }

    //can scrape team standings pretty easily
    // confs_standings_E
    // confs_standings_W

    const $ = cheerio.load(data)
    const tableBody = $('#confs_standings_E').children('tbody')
    tableBody.find('tr').each((index, ele) => {
        let row = {}
        $(ele).find('td').each((index, ele) => {
            let statName = $(ele).data().stat
            let statVal = $(ele).text()
            row[statName] = statVal
        })
        console.log(row)
        result.push(row)
    })
    return result
}

scrapeTeamSeasons(2019)