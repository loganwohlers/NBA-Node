const cheerio = require('cheerio')
const request = require('request-promise')
const teamCodeMap = require('../assets/teamCodeMap')

const exampleData = {
    _id: "5d16c72862c6ac637acc0bf5",
    gameCode: "201810160BOS",
    date: "20181016",
    game_start_time: "8:00p",
    visitor_pts: "87",
    home_pts: "105",
    overtimes: "",
    attendance: "18,624",
    game_remarks: "",
    home_team_name: "Boston Celtics",
    visitor_team_name: "Philadelphia 76ers"
}

gameData = async (arr) => {
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
        let th = $(ele).find('th')
        let data = $(th).attr('csk')
        if (data) {
            let row = {}
            row.gameCode = data
            row.date = data.slice(0, -4)
            $(ele).find('td').each((index, ele) => {
                let statName = $(ele).data().stat
                let statVal = $(ele).text()
                row[statName] = statVal
            })
            //right here we get the boxscore and attach it
            results.push(row)
        }
    })
    return results
}

getBoxScore = async (gameData) => {
    let gameURL = 'https://www.basketball-reference.com/boxscores/' + gameData.gameCode + '.html'
    console.log(gameURL)
    try {
        data = await request(gameURL)
    } catch (e) {
        return console.log(e)
    }
    const $ = cheerio.load(data)

    let homeCode = teamCodeMap[gameData.home_team_name]
    let awayCode = teamCodeMap[gameData.visitor_team_name]

    let homeID = '#box_' + homeCode.toLowerCase() + '_basic'
    let awayID = '#box_' + awayCode.toLowerCase() + '_basic'
    console.log(homeID)
    console.log(awayID)

    const homeBasicBox = $(homeID).children('tbody')
    console.log(homeBasicBox.html())
    // const awayBasicBox = $('#schedule').children('tbody')


}

getBoxScore(exampleData)



