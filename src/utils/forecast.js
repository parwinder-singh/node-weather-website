const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/f27ba9343e90df05e623ad9e8612ea42/' + latitude + ',' + longitude + '?units=si';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to fetch forecast information!');
        } else if (body.error) {
            callback('Unable to find the location!                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ');
        } else {
            const message = `It is currently ${body.currently.temperature} degrees out.
            There is ${body.currently.precipProbability}% chance of rain today.`;
            callback(undefined, message);
        }
    });
}

module.exports = forecast;