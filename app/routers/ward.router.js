const express=require('express');
var wardRouter = express.Router()
const wardController=require('../controller/ward.controller');


wardRouter.get("/getAll",wardController.getAll)

wardRouter.get("/getByCityAndDistrict/:id_city/:id_district",wardController.getByCityAndDistrict)

module.exports=wardRouter