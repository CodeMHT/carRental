import express from 'express';
import client from '../db.js';

const route = express.Router();


route.post("/", (req, res) => {

    var rental = [req.body.rented_PickUp, req.body.rented_Return, req.body.vehicle_ID, req.body.renter_Name, req.body.renter_ID, req.body.renter_Email, req.body.renter_Mobile, req.body.rented_Cost]

    client.query("INSERT INTO rentedvehicles (rented_PickUp, rented_Return, vehicle_ID, renter_Name, renter_ID, renter_Email, renter_Mobile, rented_Cost) VALUES ($1, $2, $3, $4, $5, $6, $7, $8", rental, (err, result) => {
        if (err) {
            console.log(err)
            res.send("Failure")

        } else {
            res.send("Success")
        }

    })
})

//Get Customers from the current year
route.get("/customers", (req, res) => {
    client.query("Select Distinct renter_Name from rentedvehicles where EXTRACT(YEAR FROM rented_Pickup) = EXTRACT(YEAR FROM CURRENT_DATE)", (err, result) => {
        if (err) {
            res.send("Failure customers")
        } else {
            res.send(result.rows)
        }

    })
})


//Get info about booked Vehicles and person
route.get("/", (req, res) => {
    var prevarray = []
    var newarray = []
    var currentdate = new Date()
    client.query("SELECT * FROM vehicles INNER JOIN rentedvehicles ON vehicles.vehicle_ID=rentedvehicles.vehicle_ID", (err, result) => {
        if (err) {
            res.send("Failure")
        } else {
            prevarray = result.rows


            //get only the Cars that are stil booked 
            for (var i = 0; i < prevarray.length; i++) {
                var vehicleDate = new Date(prevarray[i].rented_Return)

                if (currentdate < vehicleDate) {
                    prevarray[i].rented_return = vehicleDate.toDateString()
                    newarray.push(prevarray[i])
                }
            }

            res.send(newarray)

        }

    })
})


export default route;