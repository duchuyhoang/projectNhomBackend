const express=require('express');
var userRouter = express.Router()
var loginMiddleware=require('../middlewares/checkJWT')
const userController=require('../controller/user.controller');


userRouter.use(loginMiddleware.verifyToken)

userRouter.post("/requestPromotion",userController.requestPromotion);





module.exports =userRouter;