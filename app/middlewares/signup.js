const User = require("../model/user.model");

exports.checkUserExist = (req, res,next) => {

    const email = req.body?.email || null;
    if (email) {
        User.checkUserExist(email).then((value) => {
            next();

        }).catch(err => {
            res.status(err.status).json(err);
        })
    }
    else {
        res.status(404).json("Email not valid");
    }


}