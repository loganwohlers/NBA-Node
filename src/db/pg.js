const { Client } = require('pg')
const { teams_table, seasons_table } = require('../../assets/tables')
const teams = require('../../assets/teams')

const connectionString = 'postgresql://postgres:password@localhost:5432/nbanode'

const client = new Client({
    connectionString
})



pgConnect = async () => {
    await client.connect()
    try {
        const cleared = await clearTables(['teams'])
        console.log(cleared)

        await seedTeams()
        // console.log('tables created!')
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
            console.log(res.rows[0])
        }
    } catch (e) {
        return console.log(e)
    }
}

createTables = async table_names => {
    for (let i = 0; i < table_names.length; i++) {
        await client.query(table_names[i])
    }
    // const ctt = await client.query(teams_table)
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
