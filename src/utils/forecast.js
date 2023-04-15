const request = require('request')

const forecast = (address, callback) => {
    const url = 'https://api.weatherapi.com/v1/current.json?key=225728453eac4f6cb6922107233003&q='+ encodeURIComponent(address) +'&aqi=no'

    request ({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to forecast server', undefined)
        }else if(body.error){
            callback(body.error.message, undefined)
        }else{
            callback(undefined, body.current.condition.text + '. Its currently ' + body.current.temp_c +  ' degrees out. Its feels like ' + body.current.feelslike_c +' degrees out.')
        }
    })
}

module.exports = forecast







// const url = 'https://api.weatherapi.com/v1/current.json?key=225728453eac4f6cb6922107233003&q=oslo&aqi=no'

//  request({ url: url, json: true}, (error, response) => {
//     // const data = JSON.parse(response.body)
//     if (error){
//         console.log('Unable to connect to weather service!')
//     }else if(response.body.error){
//         console.log(response.body.error.message) 
//     }else{
//         console.log(response.body.current.condition.text + '. Its currently ' + response.body.current.temp_c +  ' degrees out. Its feels like ' + response.body.current.feelslike_c +' degrees out.')

//     }
//  })