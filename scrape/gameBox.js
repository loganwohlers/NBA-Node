const cheerio = require('cheerio')
const request = require('request-promise')
const teamCodeMap = require('../assets/teamCodeMap')
const scrapeSeason = require('./season')

// const exampleData = {
//     _id: "5d16c72862c6ac637acc0bf5",
//     gameCode: "201810160BOS",
//     date: "20181016",
//     game_start_time: "8:00p",
//     visitor_pts: "87",
//     home_pts: "105",
//     overtimes: "",
//     attendance: "18,624",
//     game_remarks: "",
//     home_team_name: "Boston Celtics",
//     visitor_team_name: "Philadelphia 76ers"
// }

// seasonBoxScores = async (games) => {
//     // let games
//     // try {
//     //     games = await scrapeSeason(2019)
//     // } catch (e) {
//     //     return console.log(e)
//     // }
//     let results = []
//     for (let i = 0; i < 5; i++) {
//         let currGameBox
//         try {
//             currGameBox = await getBoxScores(games[i])
//         } catch (e) {
//             return console.log(e)
//         }
//         results.push(currGameBox)
//     }
//     console.log(results[0].homeBoxScores.basic)
// }

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
        homeBasicBox,
        awayBasicBox,
        homeAdvancedBox,
        awayAdvancedBox
    }
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

module.exports = { getBoxScores, scrapeBox }





