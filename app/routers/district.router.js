const express=require('express');
var districtRouter = express.Router()
const districtController=require('../controller/district.controller');
// districtRouter.all("*",loginMiddleware.verifyToken)

districtRouter.get("/getAll",districtController.getAll);

districtRouter.get("/getById/:id",districtController.getDistrictByCity);

module.exports=districtRouter