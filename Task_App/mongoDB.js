const {MongoClient,ObjectID} = require('mongodb');

const connectionURL = "mongodb://127.0.0.1:27017";

const databaseName = "task-app";

MongoClient.connect(connectionURL,{'useNewUrlParser':true}, (error,client)=>{
    if(error){
        return console.log("Error connecting to DB.");
    }    
    console.log("Connected Successfully.")
    const db = client.db(databaseName);
    /*db.collection('users').insertOne({
        "name":"Dinesh Kumar",
        "age" : 22
    },(error,result)=>{
        if(error){
            return console.log("Error inserting record to db.");
        }
        console.log(result.ops);
    });
    db.collection("tasks").insertMany([{
        "taskName":"Learn ElasticSearch",
        "completed":false
    },{
        "taskName":"Learn Amazon Web Services",
        "completed":false 
    }],(error,result)=>{
        if(error){
            return console.log("Error inserting records to task collection");
        }

        console.log(result.ops);
    });*/
});