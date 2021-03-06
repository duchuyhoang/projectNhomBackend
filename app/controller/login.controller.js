const express = require('express');
const jwt = require("jsonwebtoken");
const loginMiddleware = require('../middlewares/checkJWT');
const databaseConst = require('../common/const');
const fetch = require('node-fetch');
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
            const { id, email, permission } = result[0];
            const permissionMapped = databaseConst.userAccountPermission[permission];
            if (permissionMapped) {
                const accessToken = generateAccessToken({ email, id, permission: permissionMapped });
                const refreshToken = generateRefreshToken({ email, id, permission: permissionMapped });
                res.json({
                    accessToken,
                    refreshToken
                })
            }

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
    const { oldTokenInfo } = req.body || null;
    if (oldTokenInfo) {
        const { id, email, permission } = oldTokenInfo
        const accessToken = generateAccessToken({ id, email, permission });

        res.json({
            accessToken
        })
    }
    else
        res.status(401).json({ message: "Unauthorized" })


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
                const accessToken = generateAccessToken({ email: decode.email, id: decode.id, permission: decode.permission });
                res.status(200).json({ accessToken });
            }

        })
    }

    else
        res.status(401).json({ message: "Unauthorized" })

}



//Check user email if exist or not 
const checkUserExist = (email) => {

    if (email) {
        return User.checkUserExist(email);
    }

    else {
        return null;
    }


}


exports.loginFacebook = (req, res) => {

    const { email, accessToken } = req.body;

    const userExistResult = checkUserExist(email)

    if (userExistResult !== null) {


        userExistResult.then(value => {
            if (value.length === 0) {
                fetch(`https://graph.facebook.com/v10.0/me?fields=id,name,picture.width(100).height(100)&access_token=${accessToken}`)
                    .then(res => { return res.json() })
                    .then(value => {
                        const facebookData = {
                            name:value.name,
                            id: value.id,
                            avatar: value.picture.data.url,
                            email: email
                        }
                        req.session.TemporatoryUser = facebookData

                        res.status(302).json({ status: 302, firstFacebook: true, info: facebookData })


                    }).catch(err => {
                        console.log(err);
                    })
            }

        })
            .catch(err => {
                const {id,email,permission} = err.user;
                const permissionMapped = databaseConst.userAccountPermission[permission];

                if (permissionMapped) {
                    const accessToken = generateAccessToken({ email, id, permission: permissionMapped });
                    const refreshToken = generateRefreshToken({ email, id, permission: permissionMapped });

                    res.status(200).json({
                        status:200,
                        accessToken,
                        refreshToken
                    })
                }
            })


    }


}


