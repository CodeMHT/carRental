import express from 'express';
import multer from 'multer';
import path from 'path';
import client from '../db.js';

const route = express.Router();



//storage for images

const siteimages = multer.memoryStorage()
const save = multer({ siteimages })

//Add new car
route.post('/', save.single('car_Image'), async (req, res) => {

    const { originalname, buffer } = req.file


    var cost = 0;

    if (req.body.car_Type === "M") {
        cost = 750
    } else if (req.body.car_Type === "X") {
        cost = 950
    } else if (req.body.car_Type === "E") {
        cost = 500
    } else if (req.body.car_Type === "S") {
        cost = 250
    } else {
        cost = 1000
    }


    var car = [req.body.car_Name, req.body.car_Date, req.body.car_Info, "In Lot", originalname, req.body.car_Type, req.body.car_Trans, cost, buffer];

    client.query("INSERT INTO vehicles (vehicle_Name, vehicle_Date, vehicle_Info, vehicle_Availability, vehicle_Image, vehicle_Type, vehicle_Trans, vehicle_Cost,image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9)", car, (err, result) => {
        if (err) {
            console.log(err)
            res.send("Failure")
        } else {
            res.send("Success")
        }

    })

})

//Get specific model
route.get('/:model', (req, res) => {
    var arrVehicles = []   //Array to store all vehicles that we have
    var arrFinal = []   //Array to be sent to the frontend

    const model = req.params.model
    client.query(`select vehicle_id,vehicle_name,vehicle_date,vehicle_info,vehicle_availability,vehicle_image,vehicle_type,vehicle_trans,vehicle_cost from vehicles where vehicle_type =$1`, [model], (err, result) => {
        if (err) {
            res.send("Failure Getting Model")
        } else {
            arrVehicles = result.rows
            client.query("SELECT vehicle_ID FROM rentedvehicles WHERE rented_Return > CURRENT_DATE;", (err1, result1) => {
                if (err1) {
                    res.send("Failure Getting Non Rented");
                } else {
                    let arrRented = result1.rows;

                    for (let i = 0; i < arrVehicles.length; i++) {
                        let isRented = false;

                        for (let j = 0; j < arrRented.length; j++) {
                            if (arrVehicles[i].vehicle_id === arrRented[j].vehicle_id) {
                                isRented = true;
                                break;  // Exit the loop once a match is found
                            }
                        }

                        if (!isRented)
                            arrFinal.push(arrVehicles[i]);
                    }

                    res.send(arrFinal);
                }

            });

        }

    })

})

//Get specific car
route.get('/car/:id', async (req, res) => {

    const id = req.params.id
    client.query("select vehicle_id,vehicle_name,vehicle_date,vehicle_info,vehicle_availability,vehicle_image,vehicle_type,vehicle_trans,vehicle_cost from vehicles where vehicle_id = $1", [id], (err, result) => {
        if (err) {
            res.send("Failure")
        } else {
            res.send(result.rows)
        }

    })

})

//get all vehicles
route.get("/", (req, res) => {
    client.query("select vehicle_id,vehicle_name,vehicle_date,vehicle_info,vehicle_availability,vehicle_image,vehicle_type,vehicle_trans,vehicle_cost from vehicles", (err, result) => {
        if (err) {
            res.status(500).send("Loading Failure");
        } else {

            res.send(result.rows);
        }

    });
});

//Get Available Cars
route.get("/available/car", (req, res) => {

    var arrVehicles = []   //Array to store all vehicles that we have
    var arrFinal = []   //Array to be sent to the frontend


    client.query("select vehicle_id,vehicle_name,vehicle_date,vehicle_info,vehicle_availability,vehicle_image,vehicle_type,vehicle_trans,vehicle_cost from vehicles ", (err, result) => {
        if (err) {
            res.send("Failure")
        } else {
            arrVehicles = result.rows
            client.query("SELECT vehicle_ID FROM rentedvehicles WHERE rented_Return > CURRENT_DATE;", (err1, result1) => {
                if (err1) {
                    res.send("Failure");
                } else {
                    let arrRented = result1.rows;

                    for (let i = 0; i < arrVehicles.length; i++) {
                        let isRented = false;

                        for (let j = 0; j < arrRented.length; j++) {
                            if (arrVehicles[i].vehicle_id === arrRented[j].vehicle_id) {
                                isRented = true;
                                break;  // Exit the loop once a match is found
                            }
                        }

                        if (!isRented)
                            arrFinal.push(arrVehicles[i]);
                    }

                    res.send(arrFinal);
                }
            });

        }

    })

})

//Route to get Images for each car
route.get("/image/:id", (req, res) => {
    const id = req.params.id
    client.query('Select image from vehicles where vehicle_id =$1', [id], (err, result) => {
        if (err) {
            res.send("Error: " + err)
        } else if (result.rows.length > 0 && result.rows[0].image !== null) {
            var image = result.rows[0].image
            var imageBuff = Buffer.from(image, 'binary')
            res.send(imageBuff)

        } else {
            res.send("Image Not Found")
        }
    })
})

export default route


