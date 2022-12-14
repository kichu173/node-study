const path = require('path'); // core module
const express = require('express');
const hbs = require('hbs');


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
//     res.send({
//         name: 'kichu',
//         age: 27
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h2>About page</h2>')
// })

app.get('/weather', (req, res) => {
    res.send([
        {
            forecast: 'It is cloudy',
            location: 'chennai'
        }, 
        {
            forecast: 'Dark shady',
            location: 'philadelphia'
        }
    ])
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