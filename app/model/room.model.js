const db = require("../common/connection");
const staticConst = require("../common/staticConst");
class Room {
  static #baseRoomInfoQuery = `SELECT room.*,
 province._name AS cityName,
 district._name AS districtName,
 ward._name AS wardName,
 ward._prefix AS wardPrefix,
user_profile.avatar AS user_avatar,
user_profile.name AS user_name,
user_profile.phone AS user_phone,
 GROUP_CONCAT(DISTINCT room_images.link SEPARATOR '${staticConst.concatSeparator}') AS imagesLinks,
 GROUP_CONCAT(DISTINCT room_images.id_image SEPARATOR '${staticConst.concatSeparator}') AS imagesIds,
 GROUP_CONCAT(DISTINCT utilities.id SEPARATOR '${staticConst.concatSeparator}') AS utilitiesIds,
 GROUP_CONCAT(DISTINCT utilities.name SEPARATOR '${staticConst.concatSeparator}') AS utilitiesName
 FROM room 
 LEFT JOIN province ON room.city = province.id
 LEFT JOIN district ON room.district =district.id
 LEFT JOIN ward ON room.ward=ward.id
 LEFT JOIN room_images ON room.id=room_images.id_room
 LEFT JOIN utilities_in_room ON room.id=utilities_in_room.id_room
 LEFT JOIN utilities ON utilities.id=utilities_in_room.id_ultility
 LEFT JOIN user_profile ON room.belongTo=user_profile.id_user
 WHERE room.isShow=1`;

  static createRoom(dataMap) {
    let fields = [],
      range = [],
      data = [];

    for (let key in dataMap) {
      fields.push(key);
      range.push("?");
      data.push(dataMap[key]);
    }

    return new Promise(function (resolve, reject) {
      db.query(
        `INSERT INTO room( ${fields.join(
          ","
        )},createTime )  VALUES(${range.join(",")},NOW());`,
        data,
        (err, result) => {
          if (err) {
            reject(err);
          }
          // The result here has insertId so we can return it just console.log to see
          // console.log(result);
          // const {insertedId}=result[0];
          else resolve(result);
        }
      );
    });
  }

  static getAllRoom() {
    return new Promise((resolve, reject) => {
      db.query(this.#baseRoomInfoQuery + " GROUP BY room.id", (err, result) => {
        if (err) reject(err);
        else resolve(result[0].id === null ? [] : result);
      });
    });
  }

  static getLatestRoom(count = 18) {
    return new Promise((resolve, reject) => {
      db.query(
        this.#baseRoomInfoQuery +
          ` GROUP BY room.id ORDER BY room.id DESC LIMIT ${count}`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result[0].id === null ? [] : result);
        }
      );
    });
  }

  static getRoomByNameRouter(name) {
    const index = this.#baseRoomInfoQuery.indexOf("WHERE");
    return new Promise((resolve, reject) => {
      db.query(
        this.#baseRoomInfoQuery.slice(0, index) +
          `WHERE room.name_router LIKE  ` +
          db.escape("%" + name + "%") +
          " GROUP BY room.id LIMIT 1",
        name,
        (err, result) => {
          if (err) reject(err);
          else {
            resolve(result[0]?.id === null || undefined ? [] : result);
          }
        }
      );
    });
  }

  static getRoomPriceRange() {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT MAX(room_list.price) AS max_price, MIN(room_list.price) AS min_price FROM (SELECT * FROM room ) AS room_list",
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  }

  static getAcreageRange() {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT MAX(room_list.acreage) AS max_acreage, MIN(room_list.acreage) AS min_acreage FROM (SELECT * FROM room ) AS room_list",
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  }

  static getPendingRoom() {
    const index = this.#baseRoomInfoQuery.indexOf("WHERE");
    return new Promise((resolve, reject) => {
      db.query(
        this.#baseRoomInfoQuery.slice(0, index) + "WHERE room.isShow=0 GROUP BY room.id",
        (err, result) => {
          if (err) reject(err);
          else {
            resolve(result[0].id === null ? [] : result);
          }
        }
      );
    });
  }
}

module.exports = Room;
