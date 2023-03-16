import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'

// Create a new express app
const app = express()

// Load json files
const gameData = fs.readFileSync('./public/api/game/943.json')
// Parse data to json object
const parsedData = JSON.parse(gameData)

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

    // Check if game has statistics
    if (data.hasStatistics === true) {
        let gameStats = fs.readFileSync(`./public/api/game/${data.gameId}/statistics.json`)
        let parsedStats = JSON.parse(gameStats)

        // Lowercase country codes for flag API
        data.team1CountryISO2Code = data.team1CountryISO2Code.toLowerCase()
        data.team2CountryISO2Code = data.team2CountryISO2Code.toLowerCase()

        // Form with request data
        if (!req.query.playerId) {
            res.render('index', {data, parsedStats})
        }else{
            const playerId = req.query.playerId
            console.log(playerId)
    
            const fileData = fs.readFileSync(`./public/api/facts/Player/${playerId}.json`)
            const parsedPlayerData = JSON.parse(fileData);
    
            console.log(parsedPlayerData)
            res.render('index', {data, parsedStats, parsedPlayerData})
        }
    } else {
        res.render('index', {data})
    }    
})

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
})