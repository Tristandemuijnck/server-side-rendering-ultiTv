import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import path from 'path'
import { get } from 'http'

// Create a new express app
const app = express()

// Load json files
const gameData = fs.readFileSync('./public/api/game/943.json')
// Parse data to json object
const parsedData = JSON.parse(gameData)



// Every JSON file in the player folder
const playerExtraData = fs.readdirSync('./public/api/facts/Player').filter(file => path.extname(file) === '.json');
let extraPlayerData= []
// console.log(playerExtraData)

// Read every file and parse it to json
playerExtraData.forEach(file => {
    const fileData = fs.readFileSync(path.join('./public/api/facts/Player/', file))
    let parsedFileData = JSON.parse(fileData)
    // console.log(parsedFileData)

    // Get the id of the player based on the json file name
    let playerExtraId = file.replace('.json', '')

    // Convert the id string to an integer
    playerExtraId = parseInt(playerExtraId)
    
    // Add the id to the json object
    parsedFileData.id = playerExtraId

    // Add the json object to the data array
    extraPlayerData = [...extraPlayerData, parsedFileData]
})

console.log(extraPlayerData)


// Set the view engine of the app to ejs
app.set('view engine', 'ejs')
// Set the location of the views folder
app.set('views', './views')
// Set the location of the public folder with static files
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', async (req, res) => {
    const data = parsedData

    if (data.hasStatistics === true) {
        let gameStats = fs.readFileSync(`./public/api/game/${data.gameId}/statistics.json`)
        let parsedStats = JSON.parse(gameStats)

        data.team1CountryISO2Code = data.team1CountryISO2Code.toLowerCase()
        data.team2CountryISO2Code = data.team2CountryISO2Code.toLowerCase()

        res.render('index', {data, parsedStats, extraPlayerData})
    } else {
        res.render('index', {data})
    }    
})

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
})