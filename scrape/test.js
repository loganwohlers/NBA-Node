const URL = 'http://localhost:3000'
const axios = require('axios')

testFn = async () => {
    let results = await axios.get(URL + '/players')
    let players = results.data
    let p = players.find(n => {
        return n.name.includes('Ivica')
    })
    console.log(p.seasons)
}


testFn()