const serverConst=require("../common/const");



exports.checkEnoughPermission=(req,res,next) => {
const permission=req.permission || null;
// The key for permission is in const
const comparePermissionKey=req.comparePermission || null;

if(permission){
if(permission >= serverConst.userAccountPermission[comparePermissionKey])
next();

else
res.json(403).status({status:404,message:"Fobbiden"})


}


    
}