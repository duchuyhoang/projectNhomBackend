const db = require('../common/connection');

class Ward {


    static getAll() {
        return new Promise((resolve, reject) => {
            db.query("SELECT id,_name AS name,_prefix AS prefix FROM ward", (err, result) => {
                if (err)
                    reject(err)
                else
                    resolve(result)
            })
        })
    }


    static getByCityAndDistrict(id_city, id_district) {

        return new Promise((resolve, reject) => {
            db.query("SELECT id,_name AS name,_prefix AS prefix FROM ward WHERE _province_id= ? AND _district_id = ?",
                [id_city, id_district], (err, result) => {
                    if (err){
                        console.log(err);
                        reject(err)

                    }
                    else
                        resolve(result)
                }
            )
        })

    }

}

module.exports = Ward