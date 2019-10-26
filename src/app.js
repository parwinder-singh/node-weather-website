const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();
const port = process.env.PORT || 3000;

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPathDirectory = path.join(__dirname, '../templates/views');
const partialsPathDirectory = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPathDirectory);

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPathDirectory);

// Setup static directory
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Parwinder'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Parwinder'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is the help text',
        name: 'Andrew'
    });
});
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address!'
        })
    }
    const address = req.query.address;
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })

    });
});
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Parwinder',
        errorMessage: 'Page not found in help section'
    });
});
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Parwinder',
        errorMessage: 'Page not found'
    });
});


app.listen(port, () => {
    console.log('Server is running on ' + port);
});