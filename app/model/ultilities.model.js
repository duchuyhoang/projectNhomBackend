const db = require('../common/connection');

class Ultilities {


    static insertNewUltilities() {

    }


    static insertRoomUltilities(idRoom, ultilityList) {
        // ultilityList with id_room and id_facility
        // console.log(ultilityList);
        return new Promise((resolve, reject) => {
            console.log("hello");
            db.query(`INSERT INTO utilities_in_room(id_room,id_ultility) VALUES ?`, [ultilityList], (err, rs) => {
                if (err) {
                    reject(err)
                }

                else {
                    resolve(rs)
                }
            })
        })


    }


    static getAllUltilities() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM utilities", (err, result) => {
                if (err) {
                    reject(err)
                }

                else {
                    resolve(result)
                }
            })
        })


    }


}

module.exports = Ultilities;