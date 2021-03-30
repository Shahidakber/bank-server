const { json } = require('express');
const express = require('express');
const session = require("express-session")
const dataservice = require('./services/data.service');

const app = express();
app.use(session({
    secret: "randomsecurestring",
    resave: false,
    saveUninitialized: false
}))

const logMiddleware = ((req, res, next) => {
    console.log(req.body);
    next()
})

app.use(express.json());

app.use(logMiddleware);



const authMiddleware = (req, res, next) => {

    if (!req.session.currentUser) {
        return res.json ({
            status: false,
                statusCode: 404,
                    message: "please login"
        })
    }
    else{
        next()
    }
}

app.get('/', (req, res) => {
    res.send("get method")
})
app.post('/', (req, res) => {
    res.send("post method")
})
app.put('/', (req, res) => {
    res.send("put method")
})


app.post('/register', (req, res) => {
    // console.log(req.body);
    const result = dataservice.register(req.body.accno, req.body.name, req.body.password)
    res.status(result.statusCode)
    console.log(res.json(result));

})


app.post('/login', (req, res) => {
    //  console.log(req.body);
    const result = dataservice.login(req, req.body.accno, req.body.password)
    res.status(result.statusCode)
    console.log(res.json(result));

})


app.post('/deposit',authMiddleware, (req, res) => {
    //   console.log(req.session.currentUser);
    const result = dataservice.deposit(req.body.accno, req.body.pswd, req.body.amt)
    res.status(result.statusCode)
    console.log(res.json(result));

})

app.post('/withdraw', authMiddleware,(req, res) => {
    //  console.log(req.body);
    const result = dataservice.withdraw(req.body.accno, req.body.pswd, req.body.amt)
    res.status(result.statusCode)
    console.log(res.json(result));

})

app.patch('/', (req, res) => {
    res.send("patch method")
})
app.delete('/', (req, res) => {
    res.send("delete method")
})

app.listen(3000, () => {
    console.log("server started at port 3000 ");


});