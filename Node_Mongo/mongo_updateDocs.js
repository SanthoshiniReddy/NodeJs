const {MongoClient,ObjectID} = require('mongodb');

const connectionUrl = "mongodb://127.0.0.1:27017";
const dbName = "mongodb-test";

MongoClient.connect(connectionUrl,{'useNewUrlParser':true},(err,client)=>{
    if(err){
        return console.log("Error connecting to db.");
    }
    const db = client.db(dbName);
    db.collection('users').updateOne({"userName" : "Captain America"},{$set:{
        "age" : 22
    }})
    .then((result)=>{
        console.log(result);
    })
    .catch((error)=>{
        console.log(error);
    })    
})