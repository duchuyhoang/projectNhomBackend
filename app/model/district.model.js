const db = require('../common/connection');


class District {


    static getAll() {
return new Promise((resolve, reject) => {

    db.query("SELECT id,_name AS name,_prefix AS prefix FROM district", (err, result) => {
        if (err)
            reject(err);
        else
            resolve(result);
    })
})

        
    }

    static getDistrictByCity(id_city) {

        return new Promise((resolve, reject) => {
            db.query("SELECT id,_name AS name,_prefix AS prefix FROM district WHERE _province_id=?", [id_city],
                (err, result) => {
                    if (err)
                        reject(err);
                    else
                        resolve(result);
                })
        })


    }


}
module.exports =District