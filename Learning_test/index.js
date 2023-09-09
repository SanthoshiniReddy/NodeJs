var http = require('http');
var https = require('https');
var url = require('url');
var path = require('path');
var stringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var handlers = require('./lib/handlers');
var fs = require('fs');

var httpServer = http.createServer(function(req,res){    
    var parsedUrl = url.parse(req.url,true);
    // console.log('parsedUrl: '+JSON.stringify(parsedUrl));
    var pathname = parsedUrl.pathname;
    var trimmedPath = pathname.replace(/^\/+|\/+$/g,'');
    var queryString = parsedUrl.query;
    var method = req.method;
    var payload = req.payload;
    var decoder = new stringDecoder('utf-8');
    var buffer = '';
    req.on("data",function(data){
        buffer += decoder.write(data);        
    });
    req.on('end',function(){
        buffer += decoder.end();
        // console.log('Payload sent: '+JSON.stringify(buffer));
        res.setHeader('Content-type','application/json');
        var userHandler = typeof(trimmedPath) == 'string' ? trimmedPath : '';
        // console.log('userHandler: '+userHandler);
        userHandler = typeof(handlers[userHandler]) !== 'undefined' ? handlers[userHandler] : handlers.notFound;
        var data = {
            'method' : method,
            'path' : trimmedPath,
            'queryString' : queryString
        };
        userHandler(data,function(statusCode,message){
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            res.writeHead(statusCode);            
            message = typeof(message) == 'object' ? message : {};
            message = JSON.stringify(message);
            console.log('message: ',message);
            res.end(message)
        });
    });        
}).listen(config.httpPort,function(){
    console.log('Http Server is listening on '+config.httpPort+' port');
});
