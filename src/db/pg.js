const { Client } = require('pg')

const connectionString = 'postgresql://postgres:password@localhost:5432/dvdrental'

const client = new Client({
    connectionString
})

pgConnect = async () => {
    await client.connect()
    const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    console.log(res.rows[0].message) // Hello world!
    // const res2 = await client.query('SELECT * FROM film LIMIT 1;')
    // console.log(res2)
    await client.end()
}

pgConnect()