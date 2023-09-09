var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex:true,
});

const User = mongoose.model('User',{
    'userName':{
        type:String
    },
    'age':{
        type:Number
    }    
});

const rec1 = new User({
    'userName':'Dinesh Kumar',
    'age':22
});

rec1.save()
.then((result)=>{
    console.log("Saved Successfully");
})
.catch((err)=>{
    console.log("Error saving data.");
})