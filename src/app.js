const express = require('express')

const path = require('path')

// require the two functions for geocoding and weather
const geocode = require ('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

const hbs=require('hbs')

console.log(__dirname)

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsDirectoryPath =path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials' )




// this tells express that our application will serve static
// html files with the root at publicDirectoryPath.
// then, anytime we use a root in the browser, we look
// for a file index.html within a directory that corresponds
// to the route, and display it. If we don't find a corresponding
// <route>/index.html (either no directory corresponding to the route
// or no index.html file), then we rely on the programmatically configured
// routes like the one for weather.
//
// ALTERNATIVELY, I could create a file called, e.g., help.html in the root
// public directory, but then to access it, we need to spell out the full name
// of the file, i.e. with extension, as in "http://localhost:3000/help.html"
//
// Personally, I prefer creating a directory with the same name as the root,
// and putting an index file inside.
// 
app.use(express.static(publicDirectoryPath))

// specify which templating engine to use
app.set('view engine','hbs')
app.set('views',viewsDirectoryPath)
hbs.registerPartials(partialsPath)


// now specify the new root route
// notice that if I leave the index.html file in, it will be
// looked at first. So if I want hbs to be seen, I need to rename or
// delete the index.html file. Here, I am renaming it
app.get('',(req,res) => {
    // render takes the name of the template + an object we want to pass
    // in turn, we will have to modify the template to take advantage of
    // the passed object
    res.render('index', {
        title: 'Weather App',
        name: 'Hafedh Mili'
    })
})

app.get('/about',(req,res)=> {
    res.render('about', {
        title: 'About Me',
        name: 'Hafedh Mili'       
    })
})

// help
app.get('/help',(req,res)=> {
    res.render('help', {
        title: 'Help Page',
        name: 'Hafedh',
        message: 'Kick the machine and unplug-it'
    })
})

app.get('/nohtml', (req,res) => {
    res.send([{
        name: 'Hafedh',
        age: 58
    },
    {
        name: 'Amel',
        age: 52
    }, {
        name: 'Haroun',
        age: 16
    }])
})


// weather route
app.get('/weather',(req,res) => {
    // if there is no address key/value pair in the URL
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    // there is an address => start by geocoding
    geocode(req.query.address, (error,{latitude, longitude, location}={})=> {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }     
            res.send({location,forecastData,address: req.query.address})
          
        })
    })
})

app.get('/products',(req,res) => {
    if (!req.query.search) {
        // I use return so that I exit here
        return res.send({
            error: 'you must provide a search term'
        })

    }

    // we could also put this under an else
    console.log(req.query)
    console.log(req.query.search)
    res.send({
        products: []
    })

})
app.get('/help/*',(req,res) => {
    res.render('404', {
        title: '404',
        name: 'Hafedh Mili',
        error: 'Help Article Not Found',
        message: 'Check the main help page at <a href="/help">Main Help Page </a>'
    })
})


// handle unhandled routes. This has to be last
// '*' means everything is match ... that hasn't yet been matched
app.get('*',(req,res) => {
    res.render('404', {
        title: '404',
        name: 'Hafedh Mili',
        error: 'Page Not Found',
        message: 'Check the application main page at <a href="/">Main Page</a>'
    })
})



app.listen(port,() => {
    console.log('server is up on port '+port)
})