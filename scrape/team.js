const puppeteer = require('puppeteer')


mapHomeAwayData = (seasonData) => {
    let homeSorted = seasonData.team.sort((a, b) => a.team_name - b.team_name)
    let oppSorted = seasonData.opp.sort((a, b) => a.team_name - b.team_name)

    console.log(homeSorted)
    console.log(oppSorted)

    let final = { team: {}, opponent: {} }
    return final
}

scrapeTeamData = async (year) => {
    console.log('starting puppeteer')
    const browser = await puppeteer.launch();
    const URL = 'https://www.basketball-reference.com/leagues/NBA_' + year + '.html'
    let page = await browser.newPage();
    await page.goto(URL);
    const data = await page.evaluate(() => {
        let team = []
        let opp = []

        let teamRows = document.querySelectorAll("#team-stats-per_game tbody tr");
        let oppRows = document.querySelectorAll("#opponent-stats-per_game tbody tr");
        for (let i = 0; i < 5; i++) {
            let teamData = {}
            let oppData = {}

            let teamVals = teamRows[i].querySelectorAll('td')
            let oppVals = oppRows[i].querySelectorAll('td')

            if (teamVals && oppVals) {
                for (let i = 0; i < teamVals.length; i++) {
                    let teamStatName = teamVals[i].dataset.stat
                    let teamStatVal = teamVals[i].innerText

                    let oppStatName = oppVals[i].dataset.stat
                    let oppStatVal = oppVals[i].innerText


                    teamData[teamStatName] = teamStatVal
                    oppData[oppStatName] = oppStatVal
                }
                team.push(teamData)
                opp.push(oppData)
            }
        }
        let results = { team, opp }
        return results
    })
    console.log('closing!')

    mapHomeAwayData(data)
    await browser.close()
    return data
}



scrapeTeamData(2019)

module.exports = scrapeTeamData

