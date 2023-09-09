const path = require('path');

const express = require('express');
const app = express();


const pathName = path.join(__dirname,'../public');

app.set('view engine','hbs');

app.use(express.static(pathName));

app.get('',function(req,res){
    res.send('Server responded to simple get req');
});

app.get('/help' , (req,res) => {
    res.send('Help route');
});

app.get('/about' , (req,res) => {
    res.send('About route');
});

app.listen(3000,()=>{
    console.log('Server is listening on port 3000');
})