const express = require('express');
var adminRouter = express.Router();
const checkJWT=require('../middlewares/checkJWT');
const adminController=require('../controller/admin.controller');
const permissionCheck=require('../middlewares/permissionCheck');

adminRouter.use(checkJWT.verifyToken);


adminRouter.get("/getPendingPromotion",permissionCheck.checkEnoughPermission("CO_ADMIN"),
adminController.getPendingPromotion);


adminRouter.post("/acceptRoom",permissionCheck.checkEnoughPermission("CO_ADMIN"),adminController.acceptRoom)

adminRouter.post("/rejectRoom",permissionCheck.checkEnoughPermission("CO_ADMIN"),adminController.rejectRoom)


module.exports = adminRouter


