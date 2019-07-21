const { Client } = require('pg')
const { teams_table, seasons_table, players_table, player_seasons_table } = require('../../assets/tables')
const { scrapeBoxScores, scrapePlayerSeasons, scrapeSeason, scrapeTeamData } = require('../../scrape')
const allTableNames = ['teams', 'seasons', 'players', 'player_seasons']
const teams = require('../../assets/teams')

const connectionString = 'postgresql://postgres:password@localhost:5432/nbanode'

const client = new Client({
    connectionString
})

pgConnect = async () => {
    await client.connect()
    try {
        await dropTables(allTableNames)
        await createTables([teams_table, seasons_table, players_table, player_seasons_table])
        await seedTeams()
        await seedSeason(2019)

    } catch (err) {
        console.log(err.stack)
    }
    await client.end()
}

seedSeason = async (yr) => {
    const text = `
    INSERT INTO seasons (year, description)
    VALUES ($1, $2)
    RETURNING *;`
    let description = (year - 1) + '-' + year + ' NBA Season'
    const values = [yr, description]
    try {
        const res = await client.query(text, values)
        return console.log('all seasons seeded')
    }
    catch (e) {
        return console.log(e)
    }
}

//still need to look into/fix the player.findOne({}) code below
seedPlayers = async (season) => {
    let scrapedData
    console.log('seeding players')
    try {
        scrapedData = await scrapePlayerSeasons(season.year)
        console.log('player data scraped')
    } catch (e) {
        return console.log(e)
    }
    let data = scrapedData.filter(d => d.player)
    for (let i = 0; i < data.length; i++) {
        let name = data[i].player

        //this is a strange mongo thing-- it doesn't like when you work with the same
        //doc multiple times in a row?  by doing a new query here for nothing the program
        //works as expected*****fix
        let players = await Player.findOne({})

        //checking for if this player document exists- if not create new player 
        let player = await Player.findOne({ name })
        if (!player) {
            player = new Player({
                name
            })
        }
        // creating the object that represents a played season and adding it to players seasons array
        let obj = { ...data[i] }
        if (obj.team_id !== 'TOT') {
            let team = await Team.findOne({ teamCode: obj.team_id })
            if (team) {
                obj.team = team._id
                obj.season = season._id
                player.seasons.push(obj)
                player.save()
            } else {
                return console.log('could not find team code')
            }
        }
    }
    console.log('players seeded')
}

seedTeams = async () => {
    //if table is empty then we'll populate data
    let { rowCount } = await client.query('SELECT * FROM teams LIMIT 1;')
    if (rowCount !== 0) {
        return 'Table data already seeded'
    }
    const text = `
    INSERT INTO teams (name, full_name, city, conference, division, team_code)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;`
    try {
        for (let i = 0; i < teams.length; i++) {
            const { name, fullName, city, conference, division, teamCode } = teams[i]
            let values = [name, fullName, city, conference, division, teamCode]
            const res = await client.query(text, values)
        }
        console.log('all teams seeded!')
    } catch (e) {
        return console.log(e)
    }
}

createTables = async table_names => {
    try {
        for (let i = 0; i < table_names.length; i++) {
            await client.query(table_names[i])
        }
        return console.log('all tables (re) created!')

    } catch (e) {
        return console.log(e)
    }
}

dropTables = async table_names => {
    try {
        for (let i = 0; i < table_names.length; i++) {
            await client.query(`DROP TABLE IF EXISTS ${table_names[i]} cascade;`)
        }
        return console.log('all tables dropped!')
    } catch (e) {
        return console.log(e)
    }
}

clearTables = async table_names => {
    try {
        for (let i = 0; i < table_names.length; i++) {
            await client.query(`DELETE FROM ${table_names[i]}`)
        }
        return console.log('all selected tables cleared!')
    } catch (e) {
        return console.log(e)
    }
}

pgConnect()
