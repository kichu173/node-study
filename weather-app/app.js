// https://www.npmjs.com/package/request
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Printing the forecast for given coordinates(latitude/Longitude)
// const url = 'http://api.weatherstack.com/current?access_key=3fca7c906bee8fbe74ccf9196ea66989&query=37.8267,-122.4233&units=f';

// request({
//     url: url,
//     json: true
// }, response)

// function response(err, res) {
//     if (err) { // if there is no network connection(low-level errors).
//         console.log('Unable to connect to weather service!');
//     } else if (res.body.error) {// if there is a mistake in url then it comes to res(handling edge case)
//         console.log('Unable to find location');
//     } else {
//         const current = res.body.current;
//         console.log(`${current.weather_descriptions[0]}. It is current ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out`);
//     }
// }

// Address -> Lat/Long -> Weather

// Lat/Long for Los Angeles

// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoia2ljaHUxNzMiLCJhIjoiY2xibHR0b2Z6MDB4NjNucnVhODAxdWtjNyJ9.jb4Z8DMBvsTMvI0zSp9iAg&limit=1'

// request({url: geocodeURL, json: true}, (err, res) => {
//     if (err) {
//         console.log('Unable to connect to geocode service!');
//     } else if (res.body.features.length === 0) {
//         console.log('Unable to find the latitude and longitude for provided search');
//     } else {
//         const data = res.body;
//         console.log(`Latitude is ${data.features[0].center[1]} and longitude is ${data.features[0].center[0]}`);
//     }
    
// })

// above functionality is grouped into separate functions.

const address = process.argv[2];

if (address) {
    // callback chaining
    geocode(address, function (error, response) {
        if (error) {
            return console.log(error);
        }
        forecast(response.latitude, response.longitude, (error, data) => {
            if (error) {
                return console.log(error);
            }
            console.log('location from geocode:', response.location)
            console.log('Forecast Data:', data)
        })
    })
} else {
    console.log('Please provide an address'); // node app.js chennai | node app.js "New York"
}

