const cheerio = require('cheerio')
const request = require('request')
const rp = require('request-promise')

// seedSeason = yr => {
//     const baseURL = 'https://www.basketball-reference.com/leagues/NBA_' + yr + '_games'


//         let url = baseURL + '-' + months[i] + '.html'
//          request(url, (err, res, html) => {
//             if (!err && res.statusCode === 200) {
//                 console.log('test')
//                 const $ = cheerio.load(html)
//                 const tableBody = $('#schedule').children('tbody')
//                 tableBody.find('tr').each((index, ele) => {
//                     let row = {}
//                     $(ele).find('td').each((index, ele) => {
//                         let statName = $(ele).data().stat
//                         let statVal = $(ele).text()
//                         row[statName] = statVal
//                     })
//                     data.push(row)
//                 })
//             }
//         })
//     }
//     return data
// }

seedMonth = async (month, yr) => {
    const results = []
    let data
    const url = 'https://www.basketball-reference.com/leagues/NBA_' + yr + '_games-' + month + '.html'
    try {
        data = await rp(url)
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


seedSeason = async (yr) => {
    const months = ['october', 'november', 'december', 'january', 'february', 'march', 'april', 'may', 'june']
    let results = []
    for (let i = 0; i < months.length; i++) {
        const data = await seedMonth(months[i], yr)
        results.push(data)
    }
    console.log(results.length)
    console.log(results.flat().length)
    return results
}


seedSeason(2017)





