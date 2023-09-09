var path = require('path');
var fs = require('fs');

var lib = {};


lib.baseDir = path.join(__dirname,"/../.data/");

lib.create = function(dir,file,data,callback){
    var dirpath = lib.baseDir+dir;
    if(!fs.existsSync(dirpath)){
        fs.mkdirSync(dirpath);
    }
    
}

module.exports = lib;