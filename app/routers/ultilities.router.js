const express=require('express');
var ultilityRouter = express.Router();
const ultilityController=require('../controller/ultility.controller');


ultilityRouter.get("/getAll",ultilityController.getAll);


module.exports=ultilityRouter;



