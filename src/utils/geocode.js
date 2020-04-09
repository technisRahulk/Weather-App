const request = require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' +address+'.json?access_token=pk.eyJ1IjoidGVjaG5pc3JhaHVsayIsImEiOiJjazdydmZ0M2cwaWFhM2ZrNTgxazM1YjdjIn0.TasULJ2xLCKDVCiB0Mf96g&limit=1'
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Geocode app not accessed',undefined)
        }else if(body.features.length===0){
            callback('Unable to find the location',undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[0],
                longitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
        }

    })
}

module.exports=geocode