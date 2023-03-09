import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'

// Create a new express app
const app = express()

let gameData = fs.readFileSync('./public/api/game/943.json')
let parsedData = JSON.parse(gameData)

// console.log(parsedData)

// Set the view engine of the app to ejs
app.set('view engine', 'ejs')
// Set the location of the views folder
app.set('views', './views')
// Set the location of the public folder with static files
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', async (req, res) => {
    let data = parsedData
    // console.log(data)

    if (data.hasStatistics === true) {
        let gameStats = fs.readFileSync(`./public/api/game/${data.gameId}/statistics.json`)
        let parsedStats = JSON.parse(gameStats)

        res.render('index', {data, parsedStats})
    } else {
        res.render('index', {data})
    }    
})

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
})