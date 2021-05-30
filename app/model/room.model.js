const db = require('../common/connection');

class Room{

// static createRoom({name,capacity,acreage,overview,price,rent_or_sale,city,district,
//     house_number,region,room_type,name_router})
//     {
// return new Promise(function(resolve, reject){
// db.query("INSERT INTO room(name,capacity,acreage,overview,price,rent_or_sale,city,district,house_number,region,room_type,name_router) VALUES(?,?,?,?,?,?,?,?,?,?,?,?"
// ,[name,capacity,acreage,overview,price,rent_or_sale,city,district,house_number,region,room_type,name_router]
// )})


// }

static createRoom(dataMap){

let fields=[],range=[],data=[];

for(let key in dataMap){
    fields.push(key);
    range.push("?")
    data.push(dataMap[key]);
}

return new Promise(function(resolve, reject){
db.query(`INSERT INTO room( ${fields.join(",")} )  VALUES(${range.join(",")});`,
data,
(err,result)=>{

if(err){
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

}

module.exports =Room