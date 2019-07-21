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
    //create the actual season row
    const text = `
    INSERT INTO seasons (year, description)
    VALUES ($1, $2)
    RETURNING *;`
    let description = (yr - 1) + '-' + yr + ' NBA Season'
    const values = [yr, description]
    try {
        let result = await client.query(text, values)
        let season = result.rows[0]
        let players = await seedPlayers(season)
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
    console.log(scrapedData[0])
    let data = scrapedData.filter(d => d.player)
    for (let i = 0; i < 2; i++) {
        let name = data[i].player

        //checking for if this player exists- if not create new player 
        const query = {
            // give the query a unique name
            name: 'fetch-player',
            text: `INSERT INTO players(name) VALUES($1) ON CONFLICT(name) DO NOTHING RETURNING *;`,
            //         INSERT INTO distributors(did, dname) VALUES(7, 'Redline GmbH')
            // ON CONFLICT(did) DO NOTHING;
            values: [name]
        }
        try {
            let res = await client.query(query)
            console.log(res.rows[0])
        } catch (e) {
            return console.log(e)
        }
        //     if (!player) {
        //         player = new Player({
        //             name
        //         })
        //     }
        //     // creating the object that represents a played season and adding it to players seasons array
        //     let obj = { ...data[i] }
        //     if (obj.team_id !== 'TOT') {
        //         let team = await Team.findOne({ teamCode: obj.team_id })
        //         if (team) {
        //             obj.team = team._id
        //             obj.season = season._id
        //             player.seasons.push(obj)
        //             player.save()
        //         } else {
        //             return console.log('could not find team code')
        //         }
        //     }
        // }
        // console.log('players seeded')
    }
}
// { player: 'Álex Abrines',
//   pos: 'SG',
//   age: '25',
//   team_id: 'OKC',
//   g: '31',
//   gs: '2',
//   mp_per_g: '19.0',
//   fg_per_g: '1.8',
//   fga_per_g: '5.1',
//   fg_pct: '.357',
//   fg3_per_g: '1.3',
//   fg3a_per_g: '4.1',
//   fg3_pct: '.323',
//   fg2_per_g: '0.5',
//   fg2a_per_g: '1.0',
//   fg2_pct: '.500',
//   efg_pct: '.487',
//   ft_per_g: '0.4',
//   fta_per_g: '0.4',
//   ft_pct: '.923',
//   orb_per_g: '0.2',
//   drb_per_g: '1.4',
//   trb_per_g: '1.5',
//   ast_per_g: '0.6',
//   stl_per_g: '0.5',
//   blk_per_g: '0.2',
//   tov_per_g: '0.5',
//   pf_per_g: '1.7',
//   pts_per_g: '5.3' }
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
