
const express =require("express");
const dataService = require('./services/data.service')
const app= express();
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("GET  METHOD updated")
})
app.post('/',(req,res)=>{
    res.send("POST METHOD")
})

app.post('/register',(req,res)=>{
    console.log(req.body);
    const result = dataService.register(req.body.acno,req.body.name,req.body.password);
    console.log(res.send(result.message));
})
app.put('/',(req,res)=>{
    res.send("PUT METHOD")
})
app.patch('/',(req,res)=>{
    res.send(" patch method")
})
app.delete('/',(req,res)=>{
    res.send("delete method")
})



app.listen(3000,()=>{
    console.log("server starts at 3000")

})




