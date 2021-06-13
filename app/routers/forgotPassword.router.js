const express = require('express');
var forgotPasswordRouter=express.Router();
const forgotPasswordController=require('../controller/forgotPassword.controller');
const checkJwt=require('../middlewares/checkJWT')



const User = require("../model/user.model");


const checkUserExist = (req, res,next) => {
    const email = req.body?.email || null;
    if (email) {
        User.checkUserExist(email).then((value) => {
          res.status(404).json({message:"Email doesnt exist"})

        }).catch(err => {
            req.body.name=err.user.user_name;
            req.body.id=err.user.id;
           next()
        })
    }
    else {
        res.status(404).json("Email not valid");
    }


}


forgotPasswordRouter.post("/sendMail",checkUserExist,forgotPasswordController.sendMail)


forgotPasswordRouter.get("/newPassword/:token",forgotPasswordController.newPassword)

forgotPasswordRouter.post("/newPasswordHandle",checkJwt.verifyTokenResetPassword,forgotPasswordController.handleNewPassword)

module.exports = forgotPasswordRouter