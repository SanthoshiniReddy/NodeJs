"use strict";
var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var fs = require('fs');

var httpServer = http.createServer(function(req,res){
    UnifiedServer(req,res);
});

httpServer.listen(config.httpport,function(){
    console.log("HTTP Server is listening on port "+config.httpport+" in "+config.envName+" ...");
});

var serverOptions = {
    'key' : fs.readFileSync('./https/key.pem'),
    'cert' : fs.readFileSync('./https/cert.pem')
}
var httpsServer = https.createServer(serverOptions,function(req,res){
    UnifiedServer(req,res);
});

httpsServer.listen(config.httpsport,function(){
    console.log("HTTPS Server is listening on port "+config.httpsport+" in "+config.envName+" ...");
});

function UnifiedServer(req,res){
    var parsedUrl = url.parse(req.url,true);
    
    var path = parsedUrl.pathname;
    
    var trimmedPath = path.replace(/^\/+|\/+$/g,'');
    
    var queryString = parsedUrl.query;
    
    var method = req.method;
    
    var headers = req.headers;
    
    var decoder = new StringDecoder('utf-8');
    
    var buffer = '';
    
    req.on('data',function(data){
        buffer += decoder.write(data);
    })
    req.on('end',function(){        
        buffer += decoder.end();
        
        console.log("trimmedPath: "+trimmedPath);
        var chosenHandler = (typeof(router[trimmedPath]) !== "undefined") ? router[trimmedPath] : handler.notFound;
        
        console.log('chosenHandler: '+chosenHandler);
        var data = {
            'trimmedPath':trimmedPath,
            'queryString':queryString,
            'method':method,
            'headers':headers,
            'payload':buffer
        }
        chosenHandler(data,function(statusCode,Payload){
            console.log("statusCode: "+statusCode+" Payload: "+Payload);
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            console.log("statusCode--->: "+statusCode);
            console.log("typeof(Payload): "+typeof(Payload));
            Payload = typeof(Payload) == 'object' ? Payload : {};            
            // console.log('Payload: '+buffer);
            Payload = JSON.stringify(Payload);
            console.log("Payload--->: "+Payload);
            res.setHeader('Content-type','application/json');
            res.writeHead(statusCode);
            res.end(Payload);
        });            
    }) 
}

var handler = {};

handler.sample = function(data,callback){
    callback(406,{'handler':'Routed to sample handler'});
}
handler.notFound = function(data,callback){
    callback(404);
}
var router = {
    'sample': handler.sample
}