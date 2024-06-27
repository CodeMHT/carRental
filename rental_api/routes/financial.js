import express from 'express';
import client from '../db.js';

const route = express.Router();



//Get all rentals made today
route.get("/", (req, res) => {
    client.query("select * from rentedvehicles inner join vehicles on rentedvehicles.vehicle_ID = vehicles.vehicle_ID where rentedvehicles.rented_PickUp = CURRENT_DATE", (err, result) => {
        if (err) {
            res.send("Failure")
        } else {
            res.send(result.rows)
        }

    })

})

//Get All Amount for each day totalled  (**FIX THIS**)
route.get("/revenue", (req, res) => {
    var revenue = 0
    client.query("SELECT rented_Cost FROM rentedvehicles where EXTRACT(MONTH FROM rented_PickUp) = EXTRACT(MONTH FROM CURRENT_DATE) ", (err, result) => {
        if (err) {
            res.send("Failure")
        } else {
            var arrMoney = result.rows

            for (var i = 0; i < arrMoney.length; i++) {
                revenue += parseInt(arrMoney[i].rented_cost)
            }
            res.send(revenue.toString())
        }

    })

})

//get IDs of vehicles with most rentals
route.get("/top/rented", (req, res) => {

    client.query("SELECT vehicle_ID, COUNT(*) AS TIMES FROM rentedvehicles GROUP BY vehicle_ID Order By TIMES Desc LIMIT 5;", (err, result) => {
        if (err) {
            res.send("Failure in Top Rented")
        } else {
            res.send(result.rows)  //send IDs and times they were booked
        }

    })
})

//Get Details about vehicles with most rentals
route.post("/top/vehicles", (req, res) => {

    let array = req.body;

    // Function to query the database for a single vehicle
    const getVehicle = (vehicleID) => {
        return new Promise((resolve, reject) => {
            client.query("SELECT * FROM vehicles WHERE vehicle_ID = " + vehicleID, (err, result) => {
                if (err) {
                    reject("Couldn't get vehicle");
                } else {
                    resolve(result.rows);
                }

            });
        });
    };

    // Using Promise.all to wait for all promises to resolve
    Promise.all(array.map(item => getVehicle(item.vehicle_id)))
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