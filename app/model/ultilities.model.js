const db = require('../common/connection');

class Ultilities {


static insertNewUltilities(){

}


static insertRoomUltilities(idRoom,ultilityList){
// ultilityList with id_room and id_facility
// console.log(ultilityList);
return new Promise((resolve,reject)=>{
    console.log("hello");
    db.query(`INSERT INTO utilities_in_room(id_room,id_ultility) VALUES ?`,[ultilityList],(err,rs)=>{
        if(err){
            reject(err)
            console.log(err);
        }
      
        else{
            resolve(rs)
        }
    })
})


}


}

module.exports =Ultilities;