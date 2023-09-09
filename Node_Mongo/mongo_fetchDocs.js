const {MongoClient,ObjectID} = require('mongodb');

const connectionUrl = "mongodb://127.0.0.1:27017";
const dbName = "mongodb-test";

MongoClient.connect(connectionUrl,{'useNewUrlParser':true},(error,client)=>{
    if(error){
        return console.log("Error connecting to db.");
    }
    const db = client.db(dbName);
    db.collection('users').find({'age':22}).toArray((error,results)=>{
        if(error){
            return console.log("Error fetching records from db.")
        }
        console.log("Records fetched successfully.");
        console.log(results);
    })
});