const http = require('http')
const url = 'http://api.weatherstack.com/current?access_key=3fca7c906bee8fbe74ccf9196ea66989&query=45,-75&units=f'

const request = http.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => { // chunk -> <Buffer 7b 22 6c ...
        data = data + chunk.toString();
        console.log(data); // data in json format
    })

    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(body);
    })

})

request.on('error', (error) => {
    console.log('An error:', error)
})

request.end()