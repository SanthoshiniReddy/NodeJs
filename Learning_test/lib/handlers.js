var handlers = {};

handlers.ping = function(data,callback){
    callback(200,{'Message':'Server is still listening to you.'})
}

handlers.notFound = function(data,callback){
    callback(404,'Page not found.')
}


module.exports = handlers;