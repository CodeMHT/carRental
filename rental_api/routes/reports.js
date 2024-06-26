import express from 'express';
import client from '../db.js';

const route = express.Router();



route.get("/:month", (req, res) => {

    //Current Date and Month
    if (req.params.month === "A") {
        client.query("SELECT vehicle_ID, COUNT(*) AS TIMES FROM rentedvehicles WHERE EXTRACT(MONTH FROM CURRENT_DATE) = EXTRACT(MONTH FROM rented_PickUp) AND EXTRACT(YEAR FROM CURRENT_DATE) = EXTRACT(YEAR FROM rented_PickUp) GROUP BY vehicle_ID ORDER BY TIMES DESC LIMIT 5;", (err, result) => {
            if (err) {
                res.send("Failure Doughnut")
            } else {
                res.send(result.rows)
            }

        })
    } else {
        client.query("SELECT vehicle_ID, COUNT(*) AS TIMES FROM rentedvehicles where EXTRACT(MONTH FROM rented_PickUp) =" + req.params.month + " And EXTRACT(YEAR FROM CURRENT_DATE) =EXTRACT(YEAR FROM rented_PickUp) Group BY vehicle_ID Order By TIMES Desc LIMIT 5;", (err1, result1) => {
            if (err1) {
                res.send(err1)
            } else {
                res.send(result1.rows)
            }

        })
    }

})

//Getting a vehicles name for reports
route.get("/vehicles/id/:id", (req, res) => {

    client.query("Select vehicle_Name from vehicles where vehicle_ID = " + req.params.id, (err, result) => {
        if (err) {
            res.send("Failure Name")
        } else {

            res.send(result.rows)
        }

    })
})


export default route;