var districtModel=require("../model/district.model");

exports.getAll=(req,res)=>{
    districtModel.getAll().then(value=>{
        res.json({message:"Ok",data:value});
    }).catch(err=>{
        res.json({message:"Error",data:[]})
    })
}


exports.getDistrictByCity=(req,res)=>{
    const id = req.params.id || null;
    districtModel.getDistrictByCity(id).then(value=>{
        res.json({message:"Ok",data:value});
    }).catch(err=>{
        res.json({message:"Error",data:[]})
    })
}