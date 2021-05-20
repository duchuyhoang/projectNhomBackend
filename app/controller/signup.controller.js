const User = require("../model/user.model");
const staticConst = require("../common/staticConst");

exports.signUp = async (req, res) => {
    console.log("body", req.body);
    // req.body hass user_name email password

    // var avatar = req.protocol + '://' + req.get('host')+staticConst.defaultAvatarLink;

    // Need a hash func here
    const hash_password = req.body.password

    User.signUp({ ...req.body, hash_password }).then((value) => {

        res.json({ status: 200, message: "Sign up successful" });

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