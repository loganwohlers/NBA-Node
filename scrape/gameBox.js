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
            //right here we get the boxscores using the row/game as param
            results.push(row)
        }
    })
    return results
}

getBoxScores = async (gameData) => {
    let gameURL = 'https://www.basketball-reference.com/boxscores/' + gameData.gameCode + '.html'
    console.log(gameURL)
    try {
        data = await request(gameURL)
    } catch (e) {
        return console.log(e)
    }
    const $ = cheerio.load(data)

    //get table id of boxscore for each team
    //'#box_xxx_basic'
    let homeCode = teamCodeMap[gameData.home_team_name].toLowerCase()
    let awayCode = teamCodeMap[gameData.visitor_team_name].toLowerCase()

    const homeBasicTable = $('#box_' + homeCode + '_basic').children('tbody')
    const awayBasicTable = $('#box_' + awayCode + '_basic').children('tbody')
    const homeAdvancedTable = $('#box_' + homeCode + '_advanced').children('tbody')
    const awayAdvancedTable = $('#box_' + awayCode + '_advanced').children('tbody')

    //try?
    let homeBasicBox = await scrapeBox(homeBasicTable)
    let awayBasicBox = await scrapeBox(awayBasicTable)
    let homeAdvancedBox = await scrapeBox(homeAdvancedTable)
    let awayAdvancedBox = await scrapeBox(awayAdvancedTable)

    let results = {
        homeBoxScores: {
            basic: homeBasicBox,
            advanced: homeAdvancedBox
        },
        awayBoxScores: {
            basic: awayBasicBox,
            advanced: awayAdvancedBox
        },
    }
    console.log(results)
    return results
}

//takes in a tablebody for a basic/advanced boxscore and scrapes the data
scrapeBox = async (tableBody) => {
    let results = []
    const $ = cheerio.load(tableBody)
    tableBody.find('tr').each((index, ele) => {
        let th = $(ele).find('th')
        let name = th.text()
        if (!name.includes('Reserves')) {
            let row = {}
            row.player = name
            $(ele).find('td').each((index, ele) => {
                let statName = $(ele).data().stat
                let statVal = $(ele).text()
                row[statName] = statVal
            })
            results.push(row)
        }
    })
    return results
}

getBoxScores(exampleData)



