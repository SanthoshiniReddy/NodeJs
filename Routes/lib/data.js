/*
 * Library for storing and editing data
 *
 */

// Dependencies
var fs = require('fs');
var path = require('path');

// Container for module (to be exported)
var lib = {};

// Base directory of data folder
lib.baseDir = path.join(__dirname,'/../.data/');

// Write data to a file
lib.create = function(dir,file,data,callback){
  // Open the file for writing
  var directoryName = lib.baseDir+dir;
  if(!fs.existsSync(directoryName)){
    fs.mkdirSync(directoryName);
  }    
  fs.open(directoryName+'/'+file+'.json', 'wx', function(err, fileDescriptor){
    if(!err && fileDescriptor){
      // Convert data to string
      var stringData = JSON.stringify(data);

      // Write to file and close it
      fs.writeFile(fileDescriptor, stringData,function(err){
        if(!err){
          fs.close(fileDescriptor,function(err){
            if(!err){
              callback(false);
            } else {
              callback('Error closing new file');
            }
          });
        } else {
          callback('Error writing to new file');
        }
      });
    } else {
      callback('Could not create new file, it may already exist: '+err);
    }
  });

};

// Read data from a file
lib.read = function(dir,file,callback){
  var fileNameWithDir = lib.baseDir+dir+'/'+file+'.json';
  fs.readFile(fileNameWithDir,'utf-8',function(err,data){
    callback(err,data);
  });
}


//Update data to a file
lib.update = function(dir,file,data,callback){
  var filePath = lib.baseDir+dir+'/'+file+'.json';
  fs.open(filePath,'r+',function(err,fileDescriptor){
    if(!err && fileDescriptor){
      var stringData = JSON.stringify(data);
      fs.ftruncate(fileDescriptor,function(err){
        if(!err){
          fs.writeFile(fileDescriptor,stringData,function(err){
            if(!err){
              fs.close(fileDescriptor,function(err){
                if(!err){
                  callback(false);
                } else {
                  callback('Error closing new file');
                }
              });
            }else{
              callback('Error writing to existing file.');
            }
          });
        }else{
          callback('Error truncating file.');
        }        
      });
    }else{
      callback('Error opening existing file.');
    }
  });
}

lib.delete = function(dir,file,callback){
  fs.unlink(lib.baseDir+dir+'/'+file+'.json',function(err){
    if(!err){
      callback(false);
    }else{
      callback('Error deleting file.');
    }
  });
}
// Export the module
module.exports = lib;

