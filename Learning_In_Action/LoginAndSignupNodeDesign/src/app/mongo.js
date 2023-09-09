const mongodb = require("mongodb");
const connectionUrl = "mongodb+srv://bruce_wayne:Batman%40123@playmongo-iaepa.mongodb.net";
const dbName = 'blogo';
var db = {};

mongodb.connect(connectionUrl, {    
    useNewUrlParser:true    
})
.then((client)=>{
    console.log("Successfully connected to db.");
    db.client = client.db(dbName);           
})
.catch((error)=>{
    console.log('Error connecting to db: '+error);    
})

module.exports = db;