const path = require('path')
const hbs = require('hbs')
const express = require('express')
const forecast = require('../utils/forecast')
const geocode = require('../utils/geocode')
const app = express()

const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//__dirname, __filename

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))

app.get('', (req, res, next) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Mohamed Diop'
  })
})

app.get('/about', (req, res, next) => {
  res.render('about', {
    title: 'Weather App',
    name: 'Mohamed Diop'
  })
})

app.get('/help', (req, res, next) => {
  res.render('help', {
    title: 'Weather App',
    name: 'Mohamed Diop',
    helpText: 'Hello from the help page.'
  })
})

app.get('/weather', (req, res, next) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide address.'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error) {
      return res.send({error})
    }

    forecast(latitude, longitude, (err, forecastData) => {
      if(err) {
        return res.send({error: err})
      }

      res.status(202).send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})

// app.get('/products', (req, res, next) => {
//   if(!req.query.search) {
//     return res.status(400).send({
//       error: 'You must provide a search term'
//     })
//   }
//
//   console.log(req.query)
//   res.send({
//     'products': []
//   })
// })

app.get('/help/*', (req, res, next) => {
  res.status(404).render('404', {
    error: 'Help article not found.'
  })
})

app.get('*', (req, res, next) => {
  res.status(404).render('404', {
    error: 'Not found.'
  })
})

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})
