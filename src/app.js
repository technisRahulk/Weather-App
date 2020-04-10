//server side app.js 

const path=require('path')
const hbs=require('hbs')
const express=require('express')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const port=process.env.PORT||3000

const app =express()

//Defining paths for Express config
const publicDir=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)

//setup static directory to serve
app.use(express.static(publicDir))

//setup partials location
hbs.registerPartials(partialPath)

//page configurations
app.get('',(req,res)=>{
    res.render('index')
})
app.get('/about',(req,res)=>{
     res.send([{
         name:'Rahul',
         age:20
     },{
         name:'Banku',
         age:2
     }])
 })
app.get('/order',(req,res)=>{
    res.render('order',{
        title:'Order Header'
    })
})
app.get('/login',(req,res)=>{
    res.render('login',{
        title:'login header'
    })
})
app.get('/Mausam',(req,res)=>{
    res.render('Mausam')
})
app.get('/weather',(req,res)=>{
    address=req.query.address
    if(!address){
        return res.send({
            error:'You must provide an address!!'
        })
    }
    geocode(address,(error,{location,latitude,longitude}={})=>{ 
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address

            })
        })
    })
})
app.get('/login/*',(req,res)=>{
    res.render('404',{
        title:'404:login',
      error:'Error 404: Login Page not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
      error:'Error 404:Page not found'
    })
})

 app.listen(port,()=>{
     console.log('Server listening on port ' + port)
 })
