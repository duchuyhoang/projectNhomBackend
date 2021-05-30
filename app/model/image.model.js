const db = require('../common/connection');

class Image {

    static insertRoomImage(id_room, data) {

        return new Promise(function (resolve, reject) {
            db.query(`INSERT INTO room_images(id_room,id_image,link) VALUES ? ;`, [data], (err, result) => {
                if (err) {
                    console.log("image error",err);
                    reject(err);
                }
                else
                    resolve(result)
            })
        })
    }

}

module.exports =Image;