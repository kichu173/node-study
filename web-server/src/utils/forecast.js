const request = require('request');

function forecast(latitude, longitude, callback) {
    const url = `http://api.weatherstack.com/current?access_key=3fca7c906bee8fbe74ccf9196ea66989&query=${latitude},${longitude}&units=f`

    request({ url: url, json: true }, function(error, response) {
        if (error) {
            callback('Unable to connect to weather service!', undefined); // providing undefined as second argument is optional, even if it is not provided will consider as undefined by default.
        } else if (response.body.error) {
            callback('Unable to find location', undefined);
        } else {
            const current = response.body.current;
            callback(undefined, `${current.weather_descriptions[0]}. It is current ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out`);
        }
    })
}

module.exports = forecast