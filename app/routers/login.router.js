const express = require('express');
var loginRouter = express.Router();
const loginMiddleware=require('../middlewares/checkJWT')
const loginController=require('../controller/login.controller');


// const generateAccessToken = (input) => {
//     const tokenExpireTime = Date.now() + parseInt(process.env.TOKEN_EXPIRE_TIME);
//     return jwt.sign({ ...input, tokenExpireTime }, process.env.TOKEN_SECRET
//         , { algorithm: 'HS256', expiresIn:5 , })

//         // process.env.TOKEN_EXPIRE_TIME / 1000
// }

// const generateRefreshToken = (input) => {
//     const refrestTokenExpireTime = Date.now() + parseInt(process.env.REFRESH_TOKEN_EXPIRE_TIME);
//     return jwt.sign({ ...input, refrestTokenExpireTime },
//         process.env.REFRESH_TOKEN_SECRET,
//         { algorithm: 'HS256', expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME / 1000 })
//         // process.env.REFRESH_TOKEN_EXPIRE_TIME / 1000
// }



loginRouter.post("/login", loginController.login);

// Relogin for user 
loginRouter.post("/re_login",loginMiddleware.verifyToken,loginController.reLogin)


loginRouter.post("/refresh_token", loginController.refreshToken);

loginRouter.post("/loginFacebook",loginController.loginFacebook)

module.exports = loginRouter