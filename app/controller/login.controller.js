const express = require('express');
const jwt = require("jsonwebtoken");
const loginMiddleware = require('../middlewares/checkJWT')
const User = require("../model/user.model");

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


exports.login = async (req, res) => {
    const clientEmail = req.body.email
    const clientPassword = req.body.password;
    // email === "huyhoang10032000@gmail.com" && password === "12345"
    // console.log(email);


    try {
        const result = await User.verifyLogin(clientEmail, clientPassword)
        if (!!result) {
            const { id, email } = result[0];
            const accessToken = generateAccessToken({ email, id });
            const refreshToken = generateRefreshToken({ email, id });
            res.json({
                accessToken,
                refreshToken
            })
        }
    }
    catch (err) {
        res.status(401).json({ message: "Unauthorized" })
    }
    // else {
    //     res.status(401).json({ message: "Unauthorized" })
    // }

}


exports.reLogin = (req, res) => {
    // Get the body so we can sql get the user in this case default 

    const accessToken = generateAccessToken({ id: req.body.id, email: "huyhoang10032000@gmail.com" });

    res.json({
        accessToken
    })


}


exports.refreshToken = (req, res) => {
    const refreshToken = req.body.refresh_token || null;
    if (refreshToken) {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
            if (err) {
                const error = loginMiddleware.getJWTErrorMessage(err.message);
                res.status(401).json({ error });
            }
            else {
                const accessToken = generateAccessToken({ email: decode.email, id: decode.id });
                res.status(200).json({ accessToken });
            }

        })
    }

    else
        res.status(401).json({ message: "Unauthorized" })

}



//Check user email if exist or not 
exports.checkUserExist = (req, res) => {

    const email = req.body.email;
    if (email) {

        User.verifyLogin(email).then((value) => {

            res.json(value)

        }).catch(err => {
            res.status(err.status).json(err.message);
        })

    }

    else {
        res.status(404).json("Email not valid");
    }


}
