const {MongoClient, ObjectID} = require("Mongodb");

const connectionUrl = "mongodb://127.0.0.1:27017";
const dbName = "mongodb-test";

MongoClient.connect(connectionUrl,{'useNewUrlParser':true},(error,client)=>{
    if(error){
        return console.log("Error connecting to db.");
    }
    const db = client.db(dbName);
    db.collection('users').insertMany([
        {"userName":"Dinesh Kumar",
        "age":22},
        {"userName":"Bruce Wayne",
        "age":23},
        {"userName":"Tony Stark",
        "age":24},
    ],(error,results)=>{
        if(error){
            return console.log("Error inserting records to db.");
        }
        console.log("Successfully pushed the records to db.")
    });
});