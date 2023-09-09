const bcrypt = require('bcrypt');
const db = require("./mongo");

var helper = {};

helper.hash = (Password)=>{
    return bcrypt.hashSync(Password, 10);
}

helper.compare = (Password,hash)=>{
    if(bcrypt.compareSync(Password, hash)) {        
        return true;
    } else {        
        return false;
    }
}

helper.findUser = ()=>{
    var collection = db.client.collection('users');
    collection.findOne({
        username
    }).then((result)=>{            
        if(result){            
            return true;
        }else{
            return false;
        }
    }).catch((err)=>{
        return false;
    })
}


module.exports = helper;
