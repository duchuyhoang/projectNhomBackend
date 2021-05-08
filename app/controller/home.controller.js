const express=require('express');
const User=require("../model/user.model");


exports.currentUser=(req,res)=>{
    const selectedUser=User.getUserInfo(1000);
    res.json(selectedUser);
}