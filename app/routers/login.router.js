const express = require('express');
var loginRouter = express.Router();
const loginMiddleware=require('../middlewares/checkJWT')
const loginController=require('../controller/login.controller');


loginRouter.post("/login", loginController.login);

// Relogin for user 
loginRouter.post("/re_login",loginMiddleware.verifyToken,loginController.reLogin)


loginRouter.post("/refresh_token", loginController.refreshToken);

loginRouter.post("/loginFacebook",loginController.loginFacebook)

module.exports = loginRouter