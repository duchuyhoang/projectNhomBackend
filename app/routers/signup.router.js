const express = require('express');
const signUpMiddleWares=require('../middlewares/signup');
const signUpController = require('../controller/signup.controller');
var signUpRouter=express.Router();
var multer  = require('multer')
var upload = multer()

// Doesnt need to list all field this but for the definement
signUpRouter.post("/signup",
upload.fields([{
name:"user_name",
name:"password",
name:"email",
}]),
signUpMiddleWares.checkUserExist,
signUpController.signUp
)
module.exports =signUpRouter