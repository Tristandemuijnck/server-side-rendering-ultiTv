import express from 'express'

// Create a new express app
const app = express()

// Set the view engine of the app to ejs
app.set('view engine', 'ejs')
// Set the location of the views folder
app.set('views', './views')
// Set the location of the public folder with static files
app.use(express.static('public'))

app.get('/', async (req, res) => {
    res.render('index')
})

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
})