const cheerio = require('cheerio')
const request = require('request-promise')
const teams = require('../assets/teams')
const puppeteer = require('puppeteer-core')

scrapeTeamData = async () => {
    let browser = await puppeteer.launch({ headless: false }); //headless:false so we can watch the browser as it works 
    const testUrl = 'https://www.basketball-reference.com/teams/MIL/2019.html'
    let page = await browser.newPage();
    await page.goto(testUrl);

    let details = await page.evaluate(() => {
        //Extract each episode's basic details
        let table = document.querySelector(".'#team-stats-per_game'");
        let data = Array.from(table.children);
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
    });
}

scrapeTeamSeasons = async (year) => {
    const results = []
    const url = 'https://www.basketball-reference.com/leagues/NBA_' + year + '.html'
    // const testUrl = 'https://www.basketball-reference.com/teams/MIL/2019.html'
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