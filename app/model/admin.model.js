const db = require("../common/connection");
const databaseConst = require("../common/const");
// s
class Admin {
  static getPromotionRequest = (id_admin, id_user) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT user_promotion_request.*,user_profile.id_user,user_profile.avatar FROM phong_tro.user_promotion_request INNER JOIN user_profile ON user_promotion_request.id_user=user_profile.id_user WHERE user_promotion_request.id_admin=?",
        [id_admin],
        (err, result) => {
          if (err) reject(err);
          else {
            resolve(result);
          }
        }
      );
    });
  };

  static acceptPromotionRequest = (id_admin, id_user) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE user_promotion_request SET promotion_status=${databaseConst.userAccountPermissionPending.APPROVE} WHERE id_admin=? AND id_user=?`,
        [id_admin, id_user],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  };

  static acceptARoom = (id_room) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE room SET isShow=${databaseConst.roomStatus.SHOW} WHERE id=?`,
        [id_room],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  };

  static rejectRoom = (id_room) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE room SET isShow=${databaseConst.roomStatus.HIDDEN} WHERE id=?`,
        id_room,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  };


}

module.exports = Admin;
