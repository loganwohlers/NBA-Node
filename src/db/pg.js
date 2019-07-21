const { Client } = require('pg')

const { teams_table, seasons_table, players_table, player_seasons_table } = require('../../assets/tables')
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
        // await createTables([teams_table, seasons_table, players_table, player_seasons_table])
        // await seedTeams()

    } catch (err) {
        console.log(err.stack)
    }
    await client.end()
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
            console.log(i)
            console.log(table_names[i].slice(0, 50))
            await client.query(table_names[i])
        }
        return 'tables created!'

    } catch (e) {
        return console.log(e)
    }
}

dropTables = async table_names => {
    try {
        for (let i = 0; i < table_names.length; i++) {
            await client.query(`DROP TABLE IF EXISTS ${table_names[i]} cascade;`)
        }
        console.log('tables dropped!')
    } catch (e) {
        return console.log(e)
    }
}

clearTables = async (table_names) => {
    try {
        for (let i = 0; i < table_names.length; i++) {
            await client.query(`DELETE FROM ${table_names[i]}`)
        }
        return 'tables cleared!'
    } catch (e) {
        return console.log(e)
    }
}

pgConnect()
