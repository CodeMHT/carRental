import express from 'express';
import mysql2 from 'mysql2';

const route = express.Router();

const connect = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "Mhlabunzima1*",
    database: "sneakerdb",
});

route.post("/", (req, res) => {

    var rental = [req.body.rented_PickUp, req.body.rented_Return, req.body.vehicle_ID, req.body.renter_Name, req.body.renter_ID, req.body.renter_Email, req.body.renter_Mobile, req.body.rented_Cost]

    connect.query("INSERT INTO rentedvehicles Set rented_PickUp = ?, rented_Return = ?, vehicle_ID = ?, renter_Name = ?, renter_ID =?, renter_Email =?,renter_Mobile =?,rented_Cost =?", rental, (err, result) => {
        if (err) {
            console.log(err)
            res.send("Failure")

        } else {
            res.send("Success")
        }
    })
})

//Check if car is currently being rented


//Get Customers from the current year
route.get("/customers", (req, res) => {
    connect.query("Select Distinct renter_Name from rentedvehicles where YEAR(rented_Pickup) = YEAR(curdate())", (err, result) => {
        if (err) {
            res.send("Failure customers")
        } else {
            res.send(result)
        }
    })
})


//Get info about booked Vehicles and person
route.get("/", (req, res) => {
    var prevarray = []
    var newarray = []
    var currentdate = new Date()
    connect.query("SELECT * FROM vehicles INNER JOIN rentedvehicles ON vehicles.vehicle_ID=rentedvehicles.vehicle_ID", (err, result) => {
        if (err) {
            res.send("Failure")
        } else {
            prevarray = result


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