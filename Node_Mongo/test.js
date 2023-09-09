const fs = require("fs");

var resObj = {};
fs.readFile("icd10cm_codes_2019.txt",(err,buf)=>{
    var data= buf.toString();    
    data =  data.replace('\r','');
    data = data.split('\r\n');       
    for(let i=0;i<data.length;i++){        
        let temp_splitData = data[i].split(" ");        
        for(let j=0;j<temp_splitData.length;j++){
            if(resObj[temp_splitData[j]] !== undefined){
                resObj[temp_splitData[j]] += 1
            }else{
                resObj[temp_splitData[j]] = 1;
            }
        }        
    }
    console.log(resObj);
    fs.writeFile('resultant.txt',JSON.stringify(resObj),(err)=>{
        if(!err){
            console.log('Wrote Successfully.');
        }
    })
})

/*function f1(par1){        
    if(par1 !== undefined){
        var ar = par1;
         return function f2(par2){
             if(par2 !== undefined){
                 ar *= par2 ;
                 return f2();
             }
             console.log(ar);
        }
    }
}

f1(1);
f1(1)(2);
f1(2)(3)();
f1(2)(3)(4)();

function f1(){        
    if(arguments[0] !== undefined){
        var ar = arguments[0];
         return function f2(){
             if(arguments[0] !== undefined){
                 ar *= arguments[0] ;
                 return f2();
             }
             console.log(ar);
        }
    }
}

f1(1);
f1(1)(2);
f1(2)(3)();
f1(2)(3)(4)();

var mul = 1;
function f1(){        
    if(arguments[0] !== undefined){
        mul *= arguments[0];
        return f1;
    }
}

f1(1);
console.log(mul);
mul = 1;
f1(1)(2);
console.log(mul);
mul = 1;
f1(2)(3)();
console.log(mul);
mul = 1;
f1(2)(3)(4)();
console.log(mul);

*/