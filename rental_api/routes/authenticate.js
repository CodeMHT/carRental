import express from 'express';
import mysql2 from 'mysql2';
import crypto from 'crypto'
const route = express.Router();

const connect = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "Mhlabunzima1*",
  database: "sneakerdb",
});



route.get("/:email/:password", (req, res) => {

  //creating hash object 
  var hash = crypto.createHash('sha1');
  var data = hash.update(req.params.password, 'utf-8');
  var gen_hash = data.digest('hex');

  var values = [req.params.email, gen_hash]

  connect.query("SELECT * FROM sneakerdb.user where user_Email =  ?  AND user_Password = ?", values, (err, result) => {

    if (result.length > 0) {
      res.send("Success")
    } else if (err) {
      res.send("Error In Server");
    } else {
      res.send("User Not Found")
    }
  })

})




export default route;
