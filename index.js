const express=require('express');
require('dotenv').config();
const app=express();
const path=require('path');
var cors = require('cors')
const session = require('express-session');

app.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: process.env.SESSION_SECRET, 
    // cookie: { maxAge: 60000 }

}));



const PORT=process.env.PORT||3001;
const home=require("./app/routers/home.router");
const login=require("./app/routers/login.router")
const signUp=require("./app/routers/signup.router")
const room=require("./app/routers/room.router")
const province=require("./app/routers/province.router")
const district=require("./app/routers/district.router")
const ward=require("./app/routers/ward.router")
const ultility=require("./app/routers/ultilities.router");
const forgotPassword=require("./app/routers/forgotPassword.router");




app.use(express.static(path.join(__dirname, 'app/assets')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(cors({
    origin:"http://localhost:3000",
    credentials: true
}))
app.use("/css",express.static(path.resolve(__dirname, 'app/css')))


app.set("views","./app/views");;
app.set("view engine","ejs");



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
app.use("/forgotPassword",forgotPassword)


app.get("/hh",(req,res)=>{
    res.render("forgotPassword",{name:"jiu"});
})



app.post("/hello",(req,res)=>{
    res.json({message:"dâda"})
})
app.get("/hello",(req,res)=>{
    console.log(req.params);
    req.get('host')
    res.json({message:"dâda"})
})

app.get('/set_session', (req, res) => {
    //set a object to session
    req.session.User = {
        website: 'anonystick.com',
        type: 'blog javascript',
        like: '4550'
    }

    return res.status(200).json({status: 'success'})
})

//set session
app.post('/get_session', (req, res) => {
    //check session
    console.log(req.session);
    if(req.session.User){
        return res.status(200).json({status: 'success', session: req.session.User})
    }
    return res.status(200).json({status: 'error', session: 'No session'})
})


app.listen(PORT,()=>{
    console.log("Server is listening on port "+PORT);
})