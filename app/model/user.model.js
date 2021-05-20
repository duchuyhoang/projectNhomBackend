const db = require('../common/connection');
class User {
    constructor(id) {
        this.id = id
    }

    static getUserInfo(id) {

        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM user_profile WHERE id_user = ? LIMIT 1", [id], (err, result) => {

                if (err)
                    reject("Error with server")

                if (result && result.length === 0)
                    reject("No user with that id")

                resolve(result[0])
            });



        })

    }


    static verifyLogin(email, password) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM user_account WHERE email= ? AND hash_password = ? LIMIT 1", [email, password], (err, value) => {
                if (err || (value && value.length === 0)) {
                    reject("error");
                }
                else {
                    resolve(value);
                }
            })
        })

    }

    static checkUserExist(email) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM user_account WHERE email = ?", [email], (err, value) => {
                if (err)
                    reject({
                        status: 500,
                        message: "Error with the server"
                    })
                if (value.length > 0)
                    reject({
                        status: 409,
                        message: "User exist"
                    })

                resolve({ isExist: false });
            })
        })
    }


    static signUp = (data) => {
        const { email, user_name, hash_password } = data;
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO user_account(email,user_name,hash_password) VALUES(?,?,?) "
                , [email, user_name, hash_password], (err) => {
                    if (err)
                        reject({
                            status: 500,
                            message: "Error with the server"
                        })

                })
            resolve({status:200,message:"Success"});
        })
    }



}



module.exports = User;