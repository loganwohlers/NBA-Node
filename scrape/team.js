const cheerio = require('cheerio')
const request = require('request-promise')
const teams = require('../assets/teams')
const { Team } = require('../src/models/team')

scrapeTeamSeasons = async (yr) => {
    const result = []
    const url = 'https://www.basketball-reference.com/teams/' + code + '/' + yr + '.html'
    const testUrl = 'https://www.basketball-reference.com/teams/MIL/2019.html'
    let data
    try {
        data = await request(testUrl)
    } catch (e) {
        return console.log(e)
    }
    const $ = cheerio.load(data)
    const tableBody = $('#team_and_opponent').children('tbody')
    tableBody.find('tr').each((index, ele) => {
        let row = {}
        $(ele).find('td').each((index, ele) => {
            let statName = $(ele).data().stat
            let statVal = $(ele).text()
            row[statName] = statVal
        })
        result.push(row)
    })
    return result
}