const express=require('express');
const User=require("../model/user.model");


exports.currentUser=async (req,res)=>{
const id=req.body.id || req.params.userId;
try{
const result =await User.getUserInfo(id);
if(!!result){
res.json(result);
}
}
catch(err){
    res.status(404).json(err)
}



}

