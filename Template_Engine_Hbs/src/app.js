const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

app.set('view engine','hbs');

var pathName = path.join(__dirname,'../public');
var patialsPathName = path.join(__dirname,'/partials');

hbs.registerPartials(patialsPathName);

app.get('',(req,res)=>{    
    res.render('index',{
        'title':'Template Engine(HBS)'
    });
})

app.use(express.static(pathName));

app.get('/index',(req,res) => {    
    res.send('Server responded');
})



app.get('/help',(req,res)=>{
    res.render('help',{
        'title':'Help page'
    });
})

app.get('*',(req,res)=>{
    res.send('404 not found!')
})
app.listen(3001,()=>{
    console.log('Server is listening on port 3001.');
})