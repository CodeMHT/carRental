import express from 'express';
import mysql2 from 'mysql2';

const route = express.Router();

const connect = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "Mhlabunzima1*",
    database: "sneakerdb",
});

route.get("/:month", (req, res) => {

    //Current Date and Month
    if (req.params.month === "A") {
        connect.query("SELECT vehicle_ID, COUNT(*) AS TIMES FROM rentedvehicles where month(curdate()) = month(rented_PickUp) And year(curdate()) = year(rented_PickUp) Group BY vehicle_ID Order By TIMES Desc LIMIT 5;", (err, result) => {
            if (err) {
                res.send("Failure Doughnut")
            } else {
                res.send(result)
            }
        })
    } else {
        connect.query("SELECT vehicle_ID, COUNT(*) AS TIMES FROM rentedvehicles where month(rented_PickUp) =" + req.params.month + " And year(curdate()) = year(rented_PickUp) Group BY vehicle_ID Order By TIMES Desc LIMIT 5;", (err1, result1) => {
            if (err1) {
                res.send(err1)
            } else {
                res.send(result1)
            }
        })
    }

})

route.get("/vehicles/id/:id", (req, res) => {

    connect.query("Select vehicle_Name from vehicles where vehicle_ID = " + req.params.id, (err, result) => {
        if (err) {
            res.send("Failure Name")
        } else {

            res.send(result)
        }
    })
})


export default route;