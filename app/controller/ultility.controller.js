const ultilitiesModel=require("../model/ultilities.model");

exports.getAll=(req,res)=>{

    ultilitiesModel.getAllUltilities().then((value)=>{
        res.json({message:"Ok",data:value});
    }).catch(err=>{
        res.json({message:"Error",data:null})
    })

}