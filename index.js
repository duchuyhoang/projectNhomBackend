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
const province=require("./app/routers/province.router")
const district=require("./app/routers/district.router")
const ward=require("./app/routers/ward.router")
const ultility=require("./app/routers/ultilities.router");


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
app.use("/room",room);
app.use("/province",province);
app.use("/district",district);
app.use("/ultility",ultility);
app.use("/ward",ward);




app.post("/hello",(req,res)=>{
    res.json({message:"dâda"})
})
app.get("/hello",(req,res)=>{
    res.json({message:"dâda"})
})

app.listen(PORT,()=>{
    console.log("Server is listening on port "+PORT);
})