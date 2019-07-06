const cheerio = require('cheerio')
const request = require('request-promise')
const teams = require('../assets/teams')
const puppeteer = require('puppeteer')

scrapeTeamData = async () => {
    console.log('starting puppeteer')
    const browser = await puppeteer.launch();
    const testUrl = 'https://www.basketball-reference.com/leagues/NBA_2019.html'
    let page = await browser.newPage();
    await page.goto(testUrl);
    const data = await page.evaluate(() => {
        let results = []
        let tableRows = document.querySelectorAll("#team-stats-per_game tr");
        for (let i = 0; i < 5; i++) {
            let row = {}
            let values = tableRows[i].querySelectorAll('td')
            for (let i = 0; i < values.length; i++) {
                results.push(values[i].innerText)
            }
        }
        return results
    })
    console.log(data)
    // Loop through each episode and get their details 
    // let episodes_info = episode_panels.map(episode_panel => {
    //     let title = episode_panel.querySelector(".listen-now").textContent;
    //     let datetime = episode_panel.querySelector(".datetime").textContent;
    //     let episode_download_page = episode_panel
    //         .querySelector(".download")
    //         .getAttribute("href");
    //     return { title, datetime, episode_download_page };
    // });
    // return episodes_info;
    console.log('closing!')
    await browser.close()
}

scrapeTeamSeasons = async (year) => {
    const results = []
    const url = 'https://www.basketball-reference.com/leagues/NBA_' + year + '.html'
    let data
    try {
        data = await request(url)
        console.log('test')
    } catch (e) {
        return console.log(e)
    }
    const $ = cheerio.load(data)
    const tableBody = $('#team-stats-per_game').children('tbody')
    tableBody.find('tr').each((index, ele) => {
        console.log('test')
        let row = {}
        $(ele).find('td').each((index, ele) => {
            let statName = $(ele).data().stat
            let statVal = $(ele).text()
            row[statName] = statVal
        })
        console.log(row)
        results.push(row)
    })
    console.log(results)
    return results
}

// scrapeTeamSeasons(2019)
scrapeTeamData()