const express = require('express');
const provinceRouter = express.Router();
const provinceController=require('../controller/province.controller');



provinceRouter.get("/getAll",provinceController.getAll);

provinceRouter.get("/getById/:id",provinceController.getById);


module.exports=provinceRouter;

