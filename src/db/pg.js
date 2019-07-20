const { Client } = require('pg')

const connectionString = 'postgresql://postgres:password@localhost:5432/nbanode'

const client = new Client({
    connectionString
})

// const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'
// const values = ['brianc', 'brian.m.carlson@gmail.com']
const text =
    `
    CREATE TABLE test(
        test_id SERIAL UNIQUE,
        name VARCHAR(255)
    );
    `


pgConnect = async () => {
    await client.connect()
    try {
        const res = await client.query(text)
        console.log(res)
    } catch (err) {
        console.log(err.stack)
    }

    // const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    // console.log(res.rows[0].message) // Hello world!
    // // const res2 = await client.query('SELECT * FROM film LIMIT 1;')
    // // console.log(res2)
    await client.end()
}

pgConnect()