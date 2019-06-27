const URL = 'http://localhost:3000'
const axios = require('axios')

playerTest = async () => {
    let results = await axios.get(URL + '/players')
    let players = results.data
    let p = players.find(n => {
        return n.name.includes('Ivica')
    })
    console.log(p.seasons)
}
gameTest = async () => {
    let results = await axios.get(URL + '/games')
    let games = results.data
    console.log(games.length)
}


gameTest()