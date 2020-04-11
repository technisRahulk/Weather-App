const request=require('request')
var os = require('os')

const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/428359332ff7c0eff87b2f6dd18deb8a/'+ longitude + ',' + latitude + '?units=si'
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback("Weather app not accessed",undefined)
        }
        else if(body.error){
            callback('Unable to find the location',undefined)
        }
        else{
            callback(undefined,body.daily.data[0].summary + 'It is currrently '+ body.currently.temperature + ' degrees out.'+os.EOL+'There is a ' + body.currently.precipProbability +' % chance of rain.'+os.EOL+'Today\'s High:'+body.daily.data[0].temperatureHigh +os.EOL+'Today\'s Low:'+body.daily.data[0].temperatureLow)
    
        }
         
    })

}
module.exports=forecast