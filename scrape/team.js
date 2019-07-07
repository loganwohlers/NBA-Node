const puppeteer = require('puppeteer')

scrapeTeamData = async (year) => {
    console.log('starting puppeteer')
    const browser = await puppeteer.launch();
    const URL = 'https://www.basketball-reference.com/leagues/NBA_' + year + '.html'
    let page = await browser.newPage();
    await page.goto(URL);
    const data = await page.evaluate(() => {
        let results = []
        let tableRows = document.querySelectorAll("#team-stats-per_game tbody tr");
        for (let i = 0; i < tableRows.length; i++) {
            let row = {}
            let values = tableRows[i].querySelectorAll('td')
            if (values) {
                for (let i = 0; i < values.length; i++) {
                    let statName = values[i].dataset.stat
                    let statVal = values[i].innerText
                    row[statName] = statVal
                }
                results.push(row)
            }
        }
        return results
    })
    console.log('closing!')
    await browser.close()
    return data
}

// scrapeTeamData(2019)

module.exports = scrapeTeamData

