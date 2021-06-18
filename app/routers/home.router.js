const express=require('express');
var homeRouter = express.Router()
var loginMiddleware=require('../middlewares/checkJWT')
const jwt = require("jsonwebtoken");
const homeController=require('../controller/home.controller');

homeRouter.get("/current_user/:userId",loginMiddleware.verifyToken,homeController.currentUser);

homeRouter.get("/user/:userId",homeController.currentUser)


homeRouter.get("/homes",loginMiddleware.verifyToken,(req,res)=>{
res.send("haaa")
})
module.exports=homeRouter
