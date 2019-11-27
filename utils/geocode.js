const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibW9oYW1lZGRpb3AiLCJhIjoiY2pkeWx6bG51NGVvdTJxcW92NjEyc2J1bCJ9.ydP45JN7yEgjivSkyEFyIg&limit=1'
  request({url, json: true}, (error, {body}) => {
    if(error) {
      callback('Unable to connect to location service.', undefined)
    } else if(!body.features.length) {
      callback('Unable to find location. Try another search.', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
