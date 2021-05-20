const mysql=require("mysql");

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'H1u2y3123',
    database : 'phong_tro',
    port :3306
  });
   
  connection.connect((err)=>{
      if(err){
        console.log("Server connect error");
      }
      else{
          console.log("Database established");
      }
  });

  module.exports =connection;