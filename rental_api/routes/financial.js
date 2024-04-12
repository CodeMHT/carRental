import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv'
dotenv.config()

const route = express.Router();

const connect = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

//Get all rentals made today
route.get("/", (req, res) => {
    connect.query("select * from rentedvehicles inner join vehicles on rentedvehicles.vehicle_ID = vehicles.vehicle_ID where rentedvehicles.rented_PickUp = curdate()", (err, result) => {
        if (err) {
            res.send("Failure")
        } else {
            res.send(result)
        }
    })

})

//Get All Amount for each day totalled  (**FIX THIS**)
route.get("/revenue", (req, res) => {
    var revenue = 0
    connect.query("SELECT rented_Cost FROM sneakerdb.rentedvehicles where month(rented_PickUp) = month(curdate()) ", (err, result) => {
        if (err) {
            res.send("Failure")
        } else {
            var arrMoney = result

            for (var i = 0; i < arrMoney.length; i++) {
                revenue += parseInt(arrMoney[i].rented_Cost)
            }
            res.send(revenue.toString())
        }
    })

})

//get IDs of vehicles with most rentals
route.get("/top/rented", (req, res) => {

    connect.query("SELECT vehicle_ID, COUNT(*) AS TIMES FROM rentedvehicles GROUP BY vehicle_ID Order By TIMES Desc LIMIT 5;", (err, result) => {
        if (err) {
            res.send("Failure in Top Rented")
        } else {
            res.send(result)  //send IDs and times they were booked
        }
    })
})

//Get Details about vehicles with most rentals
route.post("/top/vehicles", (req, res) => {

    let array = req.body;
    let vehicles = [];

    // Function to query the database for a single vehicle
    const getVehicle = (vehicleID) => {
        return new Promise((resolve, reject) => {
            connect.query("SELECT * FROM vehicles WHERE vehicle_ID = " + vehicleID, (err, result) => {
                if (err) {
                    reject("Couldn't get vehicle");
                } else {
                    resolve(result);
                }
            });
        });
    };

    // Using Promise.all to wait for all promises to resolve
    Promise.all(array.map(item => getVehicle(item.vehicle_ID)))
        .then(results => {
            // All queries have completed successfully
            res.send(results);
        })
        .catch(error => {
            // Handle errors
            res.status(500).send(error);
        });
})


export default route;