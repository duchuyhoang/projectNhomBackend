
const jwt = require("jsonwebtoken");


exports.getJWTErrorMessage=(message)=>{
    switch(message){
case "jwt expire":
return "Token expire"

case "jwt malformed":
    return "Token malformed"

case "invalid signature":
    return "Invalid signature"

default:
    return "Fobidden"
    }


}


exports.checkJWT =(req,res,next)=>{
    next();
}

exports.verifyToken=(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(" ")[1];
    if(token===null || token==="" || token===undefined) res.status(401).json({message:"Unauthorized"});
    jwt.verify(token,process.env.TOKEN_SECRET,(err,decode)=>{
    if(err){
    res.status(401).json({message:"Unauthorized"});
    }
    else{
        req.body.id=decode.id || null;
        next();
    }
    
    })
    
    }

