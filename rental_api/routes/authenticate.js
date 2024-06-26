import express from 'express';
import crypto from 'crypto';
import client from '../db.js';

const route = express.Router();

/**client.connect((err, result) => {
  if (err) {
    console.log("Error connecting" + err)
  }
})*/
route.get("/:email/:password", (req, res) => {

  //creating hash object 
  var hash = crypto.createHash('sha1');
  var data = hash.update(req.params.password, 'utf-8');
  var gen_hash = data.digest('hex');

  var values = [req.params.email, gen_hash]

  client.query("SELECT * FROM users where user_Email =  $1  AND user_Password = $2", values, (err, result) => {

    if (err) {
      res.send("Error In Server: " + err);
    } else if (result.rows.length.toString() == "1") {
      res.send("Success")
    } else {
      res.send("User Not Found")
    }

  })


})

export default route;
