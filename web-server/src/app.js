const path = require('path'); // core module
const express = require('express');
const hbs = require('hbs');

// import geocode/forecast from utils for weather api
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname);// D:\Nodejs\node-course\web-server\src
console.log(__filename); // D:\Nodejs\node-course\web-server\src\app.js

console.log(path.join(__dirname, '../public'));// D:\Nodejs\node-course\web-server\public

const app = express();

// Define Paths for express config
const publicDirPath = path.join(__dirname, '../public');// static assets
const viewsDirPath = path.join(__dirname, '../templates/views');
const partialsDirPath = path.join(__dirname, '../templates/partials');

// view engine(handlebars set up) - use it to create some dynamic templates
app.set('view engine', 'hbs');
app.set('views', viewsDirPath);
hbs.registerPartials(partialsDirPath);

// setup static directory to serve
app.use(express.static(publicDirPath))

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Weather',
        name: 'Kichu'
    })
})

app.get('/about', function(req, res) {
    res.render('about', {
        title: 'About Me',
        name: 'Kichuu'
    })
})

app.get('/help', function(req, res) {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Kichu'
    })
})

// app.com
// app.com/help
// app.com/about

// app.get('/', (req, res) => {
//     res.send('<h1>Hello Express!</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send({ // here you can pass single obj or array of obj as well.
//         name: 'kichu',
//         age: 27
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h2>About page</h2>')
// })
// nodemon src/app.js -e js,hbs

app.get('/weather', (req, res) => { // http://localhost:3000/weather?address=boston
    const address = req.query.address;
    // if code block runs when there is no address query string provided.
    if(!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    //{ latitude, longitude, location } = {} - using es6 destructure and default parameters
    geocode(address, function(error, { latitude, longitude, location } = {}) {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, function(error, forecastData) {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address
            })
        })
    })
})

app.get('/products', function(req, res) {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query); // { search: 'games', rating: '3' } | http://localhost:3000/products?search=games&rating=3
    console.log(req.query.search); // games
    res.send({
        products: []
    })
})

app.get('/help/*', function (req, res) {
    res.render('404', {
        title: '404',
        errorMsg: "Help article not found!",
        name: 'kichu'
    })
})

app.get('*', function(req, res) {
    res.render('404', {
        title: '404',
        errorMsg: "Page not found.",
        name: 'kichu'
    })
})

app.listen(3000, function() {
    console.log('Server started');
});