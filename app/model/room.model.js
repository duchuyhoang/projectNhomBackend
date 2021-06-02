const db = require('../common/connection');
const staticConst = require('../common/staticConst');
class Room {

    static #baseRoomInfoQuery = `SELECT room.*,
 province._name AS cityName,
 district._name AS districtName,
 ward._name AS wardName,
 ward._prefix AS wardPrefix,
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
 WHERE room.isShow=1
 GROUP BY room.id `

    static createRoom(dataMap) {

        let fields = [], range = [], data = [];

        for (let key in dataMap) {
            fields.push(key);
            range.push("?")
            data.push(dataMap[key]);
        }

        return new Promise(function (resolve, reject) {
            db.query(`INSERT INTO room( ${fields.join(",")},createTime )  VALUES(${range.join(",")},NOW());`,
                data,
                (err, result) => {

                    if (err) {
                        reject(err);
                    }
                    // The result here has insertId so we can return it just console.log to see
                    // console.log(result);
                    // const {insertedId}=result[0];
                    else
                        resolve(result)

                }

            )

        })

    }

    static getAllRoom() {
        return new Promise((resolve, reject) => {
            db.query(this.#baseRoomInfoQuery, (err, result) => {
                if (err)
                    reject(err);
                else
                    resolve(result)
            })
        })

    }

    static getLatestRoom(count = 18) {
        return new Promise((resolve, reject) => {
            db.query(
                this.#baseRoomInfoQuery + `ORDER BY room.id DESC LIMIT ${count}`,
                (err, result) => {
                    if (err)
                        reject(err);
                    else
                        resolve(result)
                })

        })



    }



}

module.exports = Room