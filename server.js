const express=require('express'); // similar to import 
const send = require('send');
const server = express(); // put all methods and props inside express in this, you can use server to access all methods and props inside express.
const PORT= process.env.PORT; 
//always P in capital, here we need to use listen and give it this port to be able to send and rec (request and responce) 

// const weather=require('./assets/weather.json');
const getPoke=require('./assets/poke.json');
server.get('/getPokeNames',(req,res)=>{
    let pokeNames=getPoke.results.map(item=>{
        return item.name;
    })
    console.log(pokeNames);
     res.send(pokeNames);
})
//localhost:3010/getPoke?pokeName=bulbasaur you need to add parameter later not the whole route listed here 
//pokeName is the name of parameter (you can check this in the browser from your network requests), there can be more than one parameter adn you should declare each one in separate.

server.get('/getPoke',(req,res)=>{
    let sentname=req.query.pokeName;
    let choosenpoke=getPoke.results.find(item=>{
        if (item.name==sentname)
        return item;
    })
      res.send(choosenpoke);
    })

//localhost:3010/ this is the root route similar to homepage for example 
server.get('/',(req,res)=>{
    res.send('You are in the root route now, Omar is here :) ');
})
//localhost:3010/test if comes from front end i need to serve this using a method called get and it comes from the express itself
server.get('/test',(req,res)=>{ // dont forget the forward slash
    res.send('lets send simple string : hello from test route '); 
})
//localhost:3010/anythigng here would result the following 
server.get('*',(req,res)=>{// add a universal route as well as a status code of 404
    res.status(404).send('Not found check your link again');
})

server.listen(PORT,()=>{
    console.log(`I am here on Port ${PORT} `);
})

//localhost:3010/getweather
// server.get('/getweather',(req,res)=>{
//     let weatherdata=weather.map(item=>{
// return item ; 
//     })
   
//     res.send('All data is here',weather)
// })


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