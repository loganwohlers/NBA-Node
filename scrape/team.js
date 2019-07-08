const puppeteer = require('puppeteer')


mapHomeAwayData = ({ team, opp }) => {
    let homeSorted = team.filter(t => t.team_name)
        .sort((a, b) => a.team_name.localeCompare(b.team_name))
    let oppSorted = opp.filter(t => t.team_name)
        .sort((a, b) => a.team_name.localeCompare(b.team_name))

    let final = []
    for (let i = 0; i < homeSorted.length; i++) {
        let results = {
            team_name: homeSorted[i].team_name,
            team_stats: homeSorted[i],
            opp_stats: oppSorted[i],
        }
        final.push(results)
    }
    return final
}

scrapeTeamData = async (year) => {
    console.log('starting puppeteer')
    const browser = await puppeteer.launch();
    const URL = 'https://www.basketball-reference.com/leagues/NBA_' + year + '.html'
    let page = await browser.newPage();
    await page.goto(URL);
    const data = await page.evaluate(() => {
        let results = { team: [], opp: [] }

        let teamRows = document.querySelectorAll("#team-stats-per_game tbody tr");
        let oppRows = document.querySelectorAll("#opponent-stats-per_game tbody tr");
        for (let i = 0; i < teamRows.length; i++) {
            let teamData = {}
            let oppData = {}

            let teamVals = teamRows[i].querySelectorAll('td')
            let oppVals = oppRows[i].querySelectorAll('td')

            if (teamVals && oppVals) {
                for (let i = 0; i < teamVals.length; i++) {
                    let teamStatName = teamVals[i].dataset.stat

                    let teamStatVal = teamVals[i].innerText
                    let oppStatVal = oppVals[i].innerText

                    //both tables have the same stats but are labeled differently-- this is to ensure all data comes in with the same labels
                    teamData[teamStatName] = teamStatVal
                    oppData[teamStatName] = oppStatVal
                }
                results.team.push(teamData)
                results.opp.push(oppData)
            }
        }
        return results
    })
    console.log('closing browser!')

    let finalData = mapHomeAwayData(data)
    await browser.close()
    return finalData
}


module.exports = scrapeTeamData

