const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const cors = require('cors')

const app = express()

app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname,'../public')))
app.set('views',path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", 'GET, POST, PUT, DELETE')
    app.use(cors())
    next() 
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Lincoln Maximo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Lincoln Maximo'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'Can i help you?',
        name: 'Lincoln Maximo'
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address
    if(!address) {
        return res.send({
            error: 'Please provide an address'
        })
    }else {
        geocode(address, (error, {latitude, longitude, location} = {}) =>{   
            if(error){
                return res.send({ error })   
            }
        
            forecast(address, (error, forecastData) =>{
                if(error){
                    return res.send({ error })  
                }
        
                res.send({    
                    location,
                    forecast: forecastData
                })        
            })
        })
            
    }
})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 PAGE',
        errorMessage: 'Help article not found',
        name: 'Lincoln Maximo'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 PAGE',
        errorMessage: 'Page is not available',
        name: 'Lincoln Maximo'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})