const request = require('request')

const geocode = (address,callback) => {
    const URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGFmZWRobWlsaSIsImEiOiJjazB6d2o4djUwdXVpM2NwMWhxOGR1bndrIn0.X4pNNKF0KLs_qsS7waT0rg&limit=1'
    request( {url: URL, json: true},(error,{body})=>{
 //       request( {url: URL, json: true},(error,response)=>{
            if (error){
            callback('Unable to connect to location servioces',undefined)
//        } else if (response.body.features.length === 0){
} else if (body.features.length === 0){

            callback('Unable to find location with name: ' + address, undefined)
        } else {
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name}
//                latitude : response.body.features[0].center[1],
//                longitude: response.body.features[0].center[0],
//               location: response.body.features[0].place_name}
                )
        }

    })

}

module.exports = geocode