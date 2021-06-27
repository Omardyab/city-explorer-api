'use strict';
const { default: axios } = require('axios');
const weather = require('./data/weather.json');
// const axios = require('axios');

const weatherFunctions={};


class Forecast{
    constructor(city){
        this.date= city.valid_date,
        this.description= city.weather.description
    }
  }

weatherFunctions.weatherData=(req, res)=>{
    res.send(weather);
  }
  
weatherFunctions.weatherLonLat=(req, res)=>{
    let dataArr =weather.map((city)=> {
      return [`longitude: ${city.lon}` , `latitude: ${city.lat}`];
 }) 
  res.send(dataArr);  
}
  
weatherFunctions.weatherCityLonLat= async (req,res)=>{
    let cityName = req.query.cityName;
    console.log(`weather: ${cityName} kjhkhkjhkjhkjhkjhkh`)
   let weatherKey= process.env.WEATHER_API_KEY;
   let weatherURL= `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${weatherKey}`;
   // console.log("blah");
   console.log(weatherURL);
 try{
   let data =await axios.get(weatherURL);
   // console.log(`${data.data.data[0].pres} here the first one`);
   let receivedData = data.data;
   console.log(receivedData.data);
  //  res.status=200;
   res.status(200).send(`City: ${receivedData.city_name}  -  Longitude: ${receivedData.lon}  -  Latitude: ${receivedData.lat}`);
 }
 catch{
   res.status =500;
   res.send(`ERROR: DATA NOT FOUND FOR REQUIRED REGION`);

 }
}

weatherFunctions.weatherForcast=async (req, res)=>{
 let cityName = req.query.cityName;
 let weatherKey= process.env.WEATHER_API_KEY;
 let weatherURL= `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${weatherKey}`;
 console.log(`before ${cityName}`);
 try{
   let data =await axios.get(weatherURL);
   let receivedData = data.data;
   // console.log(receivedData);
   let cityData = receivedData.data.map(day => new Forecast(day));
   // console.log(cityData);
     res.status=200;
     res.send(cityData);
 }
 catch{
   res.status =500;
   res.send(`ERROR: DATA NOT FOUND FOR REQUIRED REGION`);
 }
}






module.exports = weatherFunctions;
// const express=require('express'); // alsi install => npm i express similar to import 
// const server = express(); // put all methods and props inside express in this, you can use server to access all methods and props inside express.
// require('dotenv').config(); //also install =>  npm i dotenv
// const send = require('send');
// const cors  =require('cors');
// const { response } = require('express');
// // const PORT= process.env.PORT; 
// server.use(cors());
// const weatherData=require('./assets/weather.json');
// const PORT= process.env.PORT ||3010; //this is another way if ,env have a problem 
// const axios = require('axios');
// const WEATHER_BIT_KEY= process.env.WEATHER_BIT_KEY;

// //always P in capital, here we need to use listen and give it this port to be able to send and rec (request and responce) 
// server.listen(PORT,()=>{
//     console.log(`I am here on Port ${PORT} `);
// })

// server.get('/',(req,res)=>{
//     res.send('Home ');
// })
// //localhost:3010/test if comes from front end i need to serve this using a method called get and it comes from the express itself
// server.get('/test',(req,res)=>{ // dont forget the forward slash
//     res.send(' hello from test route, Back-end '); 
// })
// server.get('/weatherData', (req, res)=>{
//     res.send(weatherData);
// })

// server.get('/weather', (req,res)=> {
//     const lat = req.query.lat;
//     const lon = req.query.lon;
//     if (lat && lon) {
//         const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;
//         axios.get(weatherBitUrl).then(response => {
//             const responseData = response.data.data.map(obj => new Weather(obj));
//             res.json(responseData)
//         }).catch(error => {
//             res.send(error.message)
//         });
//     } else {
//         res.send('please provide the proper lat and lon')
//     }


// });
// class Weather {
//     constructor(weatherData) {
//         this.description = weatherData.weather.description;
//         this.date = weatherData.valid_date;

//     }
// }



// class Forecast{
//     constructor(object){
//     this.date=object.valid_date;
//     this.description = `in general its ${object.weather.description} : highest temperature is  ${object.high_temp}, lowest temperature is ${object.low_temp}`;
// }
// }
//or you cna create it as function 
// function Forecast(day){ 
//     this.date=date.valid_date
//     this.description=day.weather.description
// }
//will be coming from the user (roaa said to forget about lon and lat)

//localhost:3010/weather?lat=latData&lonData=?&cityname=searchQuery
//localhost:3010/weather?city=amman
// try this on herouk it should work :https://class-7-city-explorer.herokuapp.com/getweather?lat=31.95&lon=35.91&cityname=amman
//server.get('/weather',(req,res)=>{
    // const latData=req.query.lat;
    // const lonData=req.query.lon;
    //const searchQuery=req.query.cityname;
    // const latData=31.95;
    // const lonData=35.91;
    // const searchQuery='Amman';
    // let weatherDataArr=weatherData.find(item=>{
    //     if ((searchQuery.toLowerCase()==item.city_name) || (lonData== item.lon && latData==item.lat))
    // return item ;
    // let weatherDataArr=weatherData.find(item=>{
    //     if ((item.city_name.toLowerCase()===searchQuery.toLowerCase()))
    //     return item ; 
    // })   
    // res.send(weatherDataArr)
//     if(weatherDataArr){
//         let weatherArr=weatherDataArr.data.map(item => {
//             return new Forecast(item);
//         })
//         res.status(200).send(weatherArr);
            
//     }
//     else{
//         res.status(500).send('Your input does not match our forecast database, please check again :) ')
//     }
// });
//IMPORTANT : keep this last :) 
//localhost:3010/anythigng here would result the following 
// server.get('*',(req,res)=>{// add a universal route as well as a status code of 404
//     res.status(404).send('Not found, please check your link again');
// })

//my sol of demo 
// const PORT= 3010; 

// const getPoke=require('./assets/poke.json');
// server.get('/getPokeNames',(req,res)=>{
//     let pokeNames=getPoke.results.map(item=>{
//         return item.name;
//     })
//     console.log(pokeNames);
//      res.send(pokeNames);
// })
//localhost:3010/getPoke?pokeName=bulbasaur you need to add parameter later not the whole route listed here 
//pokeName is the name of parameter (you can check this in the browser from your network requests), there can be more than one parameter adn you should declare each one in separate.
// server.get('/getPoke',(req,res)=>{
//     let sentname=req.query.pokeName;
//     let choosenpoke=getPoke.results.find(item=>{
//         if (item.name==sentname)
//         return item;
//     })
//       res.send(choosenpoke);
//     })

//localhost:3010/ this is the root route similar to homepage for example 


// const pokeData = require('./assets/poke.json');

//this is from Roaa's code : localhost:3010/getPokeName
// server.get('/getPokeName',(req,res)=>{
//     let pokeNames = pokeData.results.map(item=>{
//         return item.name;
//     })
//     res.send(pokeNames);
// })
//localhost:3010/getPokeNames
//this is from Roaa's code : localhost:3010/getPoke?pokeName=bulbasaur
// server.get('/getPoke',(req,res)=>{
//     // let pokeNamePra = req.query.pokeName;
//     let pokeItem = getPoke.results.find(item =>{
//         if(item.name == 'bulbasaur')
//         return item;
//     })
//     res.send(pokeItem);
// })