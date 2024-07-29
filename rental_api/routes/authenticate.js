import express from 'express';
import crypto from 'crypto';
import client from '../db.js';

const route = express.Router();


route.post("/", (req, res) => {

  //creating hash object 
  var hash = crypto.createHash('sha1');
  var data = hash.update(req.body.password, 'utf-8');
  var gen_hash = data.digest('hex');


  var values = [req.body.email, gen_hash]
  client.query('SELECT * FROM users where user_email = $1 and user_password = $2', values, (err, result) => {

    if (err) {
      res.send("Error In Server: " + err);
    } else if (result.rows.length.toString() === "1") {
      res.send("Success")
    } else {
      res.send("User Not Found")
    }


  })
})

export default route;
