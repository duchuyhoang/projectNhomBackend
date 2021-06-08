const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const databaseConst = require('../common/const');

const generateAccessToken = (input) => {
    const tokenExpireTime = Date.now() + parseInt(process.env.TOKEN_EXPIRE_TIME);
    return jwt.sign({ ...input, tokenExpireTime }, process.env.TOKEN_SECRET
        , { algorithm: 'HS256', expiresIn: process.env.TOKEN_EXPIRE_TIME / 1000, })

    // process.env.TOKEN_EXPIRE_TIME / 1000
}

const generateRefreshToken = (input) => {
    const refrestTokenExpireTime = Date.now() + parseInt(process.env.REFRESH_TOKEN_EXPIRE_TIME);
    return jwt.sign({ ...input, refrestTokenExpireTime },
        process.env.REFRESH_TOKEN_SECRET,
        { algorithm: 'HS256', expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME / 1000 })
    // process.env.REFRESH_TOKEN_EXPIRE_TIME / 1000
}



exports.signUp = async (req, res) => {
    console.log("body", req.body);
    // req.body hass user_name email password

    // var avatar = req.protocol + '://' + req.get('host')+staticConst.defaultAvatarLink;

    // Need a hash func here
    const hash_password = req.body.password

    User.signUp({ ...req.body, hash_password }).then((value) => {
        console.log("v", value.returnRow.insertId);
        res.json({
            status: 200, message: "Sign up successful",
            accessToken: generateAccessToken({
                email: req.body.email,
                id: value.returnRow.insertId,
                permission: databaseConst.userAccountPermission[-1]
            }),
            refreshToken: generateRefreshToken({
                email: req.body.email,
                id: value.returnRow.insertId,
                permission: databaseConst.userAccountPermission[-1]
            })
        });

    }).catch(err => {

        res.status(err.status).json(err)

    });
    // res.json({is:"adad"});

    // catch(err){
    // CREATE TRIGGER new_user AFTER INSERT ON user_account
    // FOR EACH ROW
    // INSERT INTO user_profile(id_user,name) VALUES(NEW.id,NEW.user_name);
    // }


}




exports.signupFacebook=(req,res)=>{

}