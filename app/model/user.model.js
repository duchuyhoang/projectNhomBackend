const db = require("../common/connection");
const databaseConst=require("../common/const");
class User {
  constructor(id) {
    this.id = id;
  }

  static getUserInfo(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM user_profile WHERE id_user = ? LIMIT 1",
        [id],
        (err, result) => {
          if (err) reject("Error with server");

          if (result && result.length === 0) reject("No user with that id");

          resolve(result[0]);
        }
      );
    });
  }

  static verifyLogin(email, password) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM user_account WHERE email= ? AND hash_password = ? LIMIT 1",
        [email, password],
        (err, value) => {
          if (err || (value && value.length === 0)) {
            reject("error");
          } else {
            resolve(value);
          }
        }
      );
    });
  }

  static checkUserExist(email) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM user_account WHERE email = ? LIMIT 1",
        [email],
        (err, value) => {
          if (err)
            reject({
              status: 500,
              message: "Error with the server",
            });
          if (value.length > 0)
            reject({
              user: value[0],
              status: 409,
              message: "User exist",
            });

          resolve(value);
        }
      );
    });
  }

  static signUp = (data) => {
    const { email, user_name, hash_password } = data;
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO user_account(email,user_name,hash_password) VALUES(?,?,?) ",
        [email, user_name, hash_password],
        (err, result) => {
          if (err)
            reject({
              status: 500,
              message: "Error with the server",
            });
          resolve({ status: 200, message: "Success", returnRow: result });
        }
      );
    });
  };

  static changeUserInfo = (data) => {};

  static changeUserPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE user_account SET hash_password = ? WHERE email = ?",
        [password, email],
        (err, result) => {
          if (err) reject({ status: 500, message: "Error with the server" });
          else {
            resolve(result);
          }
        }
      );
    });
  };

  static checkCanRequestAPromotion = (id_user) => {
return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM user_promotion_request WHERE id_user=? AND promotion_status=${databaseConst.accountPermissionStatus.PENDING}
    AND promotion_status=0`
    ,id_user,(err,result)=>{
if(err){
     reject({message:"Lỗi"})
}
else if(result.length>0){
  reject({message:"Bạn đã request"});
}
else{
    resolve({message:"Can request"})
}


    })
})

  };

  static requestAPromotionRequest = (id_admin, id_user) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO user_promotion_request(id_admin,id_user,action_time) VALUES(?,?,NOW())",
        [id_admin, id_user],
        (err, result) => {
          if (err) {
            reject(err);
          } else resolve(result);
        }
      );
    });
  };

static promotePermission=(id_user)=>{
return new Promise((resolve, reject) => {

db.query("UPDATE user_account SET permission=0 WHERE id=?",[id_user],(err, result) => {
if(err)
return reject(err);
else
resolve(result);

})

})

}


}

module.exports = User;
