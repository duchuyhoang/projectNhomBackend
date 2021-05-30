const serverConst = require("../common/const");
const getObjectKey = require("../ultil/getObjectKey");

// compareRole Admin or USER VIEW common/const
exports.checkEnoughPermission = (compareRole) => {
    return (req, res, next) => {
        const comparePermissionValue = getObjectKey.getKeyByValue(serverConst.userAccountPermission, compareRole);

        const userPermissionValue = getObjectKey.getKeyByValue(serverConst.userAccountPermission, req.body.permission || null)

        if (!userPermissionValue || userPermissionValue < comparePermissionValue)
            res.status(403).json({ message: "Fobbiden", status: 403 })

        else
            next()
    }
}


// exports.checkEnoughPermission = (req, res, next) => {
//     const permission = req.permission || null;
//     // The key for permission is in const
//     const comparePermissionKey = req.comparePermission || null;

//     if (permission) {
//         if (permission >= serverConst.userAccountPermission[comparePermissionKey])
//             next();

//         else
//             res.json(403).status({ status: 404, message: "Fobbiden" })


//     }



// }