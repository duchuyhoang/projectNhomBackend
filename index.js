const express=require('express');
require('dotenv').config();
const app=express();
const path=require('path');
var cors = require('cors')
const PORT=process.env.PORT||3001;
const home=require("./app/routers/home.router");
const login=require("./app/routers/login.router")
const signUp=require("./app/routers/signup.router")
const room=require("./app/routers/room.router")
app.use(express.static(path.join(__dirname, 'app/assets')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(cors())

// var allowCrossDomain = function(req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//     next();
// }

// app.use(allowCrossDomain)

app.use("/",home);
app.use("/",login);
app.use("/",signUp);
app.use("/",room);
app.post("/hello",(req,res)=>{
    res.json({message:"dâda"})
})
app.get("/hello",(req,res)=>{
    res.json({message:"dâda"})
})

app.listen(PORT,()=>{
    console.log("Server is listening on port "+PORT);
})