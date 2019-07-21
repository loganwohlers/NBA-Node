const { Client } = require('pg')
const { teams_table } = require('../../assets/tables')

const connectionString = 'postgresql://postgres:password@localhost:5432/nbanode'

const client = new Client({
    connectionString
})





pgConnect = async () => {
    await client.connect()
    try {
        const res = await client.query(teams_table)
        console.log(res)
    } catch (err) {
        console.log(err.stack)
    }
    await client.end()
}

pgConnect()