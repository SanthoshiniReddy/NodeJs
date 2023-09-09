const express = require("express");
const app = express(); 
const bodyParser = require('body-parser');
const db = require("./mongo");
const helper = require("./helper");

app.use(express.json({urlencoded:true}));

app.post('/login',(req,res)=>{
    const body = req.body;    
    const username = req.body.username;
    const password = req.body.password;    
    if(username !== undefined && password !== undefined){                   
        
    }
});
app.post('/signup',(req,res)=>{
    const body = req.body;
    const username = body.username;
    const password = body.password;
    const email = body.email;
    if(username !== undefined && password !== undefined && email !==undefined){
        //
    }else{
        res.send({errorCode:422,
            errorMessage:"Missing Details"});
    }
})
app.get('*',(req,res)=>{
    //404
    res.send({'404':'Page not found!'});
});
app.listen(3000,()=>{
    console.log("Server is listening on port 3000.");
})
