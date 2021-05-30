const db = require('../common/connection');


class Province{
    static getAll(){
return new Promise((resolve, reject) =>{
db.query("SELECT id,_name AS province_name FROM province",(err,result)=>{
    if(err)
    reject(err);

    else
    resolve(result)
})
})}

static getById(id){
return new Promise((resolve, reject)=>{
    db.query("SELECT id,_name as province_name FROM province WHERE id=?",[id],(err,result)=>{
if(err)
reject(err);
else
resolve(result)
    })
})

    
    
}

}
module.exports =Province