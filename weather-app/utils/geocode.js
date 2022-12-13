const request = require('request');

function geocode(address, callback) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2ljaHUxNzMiLCJhIjoiY2xibHR0b2Z6MDB4NjNucnVhODAxdWtjNyJ9.jb4Z8DMBvsTMvI0zSp9iAg&limit=1'

    request({url: url, json: true}, function (error, response) {
        if (error) {
            callback('Unable to connect to geocode services!', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find the location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode