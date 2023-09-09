const app = require('express')();

var initialTime = new Date().getTime();
console.log("initialTime: "+initialTime);
app.get('/', (req, res) => {
    console.log("get")    
    setTimeout(() => {
        res.send("hi get");
        console.log("Get Time For: "+((new Date().getTime()-initialTime)/1000));
    }, 10000);
})

/*app.post('/', (req, res) => {
    console.log("post")
    setTimeout(() => {
        res.send("hi post");
        console.log();
    }, 10000);
})

app.put('/', (req, res) => {
    console.log("put")
    setTimeout(() => {
        res.send("hi put");
    }, 10000);
})

app.delete('/', (req, res) => {
    console.log("delete")
    setTimeout(() => {
        res.send("hi delete");
    }, 10000);
})
*/

app.listen(3000, () => console.log('server running at 3000'))
