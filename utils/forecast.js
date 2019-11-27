const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/5a39ef6aa3040e01dbb328ee5b36d816/' + latitude + ',' + longitude + '?units=si'
  request({url, json: true}, (error, {body}) => {
    if(error) {
      callback('Unable to connect to weather service.', undefined)
    } else if (body.error) {
      callback('Unable to find location.', undefined)
    } else {
      callback(undefined, body.currently.summary + ". It's currently " + body.currently.temperature + ' degrees out. ' + 'Lowest temperature of the day is ' + body.daily.data[0].temperatureLow + ' degrees and highest is ' + body.daily.data[0].temperatureHigh + ' degrees. There is a ' + body.currently.precipProbability*100 + '% chance of rain.')
    }
  })
}

module.exports = forecast
