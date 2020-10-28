//Load required libraries from node modules
const express = require('express')
const handlebars = require('express-handlebars')

//Configure the environment
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000

//create an instance of express
const app = express()

//Configure handlebars
app.engine('hbs', handlebars({
    defaultLayout: 'default.hbs'
}))

app.set('view engine', 'hbs')

//load from static resource
app.use(express.static(__dirname + '/images'))
app.use(express.static(__dirname + '/static'))

//GET
app.get('/', (req, res) => {
    res.status(200)
    res.type('text/html')
    res.render('index')


})



//GET /roll
app.get('/roll', (req, res) => {
    let firstFilename = Math.floor(Math.random()*6 + 1).toString() + '.png'
    let secondFilename = Math.floor(Math.random()*6 + 1).toString() + '.png'
    res.status(200)
    res.type('text/html')
    res.render('roll', 
        {
           
            firstDieFilename: firstFilename,
            secondDieFilename: secondFilename

        })
})


app.use((req, res) => {
    res.redirect('/')
    // res.status(300)
    // res.render('roll')
})



//Start express
app.listen(PORT, function(){
    console.info(`Application started on port ${PORT} at ${new Date()}`)
})
