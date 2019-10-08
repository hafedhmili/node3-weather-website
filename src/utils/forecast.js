const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const URL = 'https://api.darksky.net/forecast/c3cfe2eb3ceffb427d724ece1e9d39a8/' + latitude + ',' + longitude + '?units=si'

    request({url: URL, json: true},(error,{body}) => {
        if (error){
            callback(error,undefined)

        } else if (body.error) {
            callback(body.error,undefined)

        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently '+body.currently.temperature + 
                 ' degrees out. The humidity is ' + body.currently.humidity*100 + '%. There is ' + body.currently.precipProbability + '% chance of rain')
        }
    })
}




module.exports = forecast