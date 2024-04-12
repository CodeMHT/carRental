import express from 'express';
import mysql2 from 'mysql2';
import multer from 'multer'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const route = express.Router();

const connect = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

//storage for images
const siteimages = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))

    }
})

const save = multer({
    storage: siteimages
})

//Add new car
route.post('/', save.single('car_Image'), (req, res) => {
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
    var car = [req.body.car_Name, req.body.car_Date, req.body.car_Info, "In Lot", req.file.filename, req.body.car_Type, req.body.car_Trans, cost];

    connect.query("Insert into vehicles Set vehicle_Name = ?,vehicle_Date =  ?,vehicle_Info = ?,vehicle_Availability = ?,vehicle_Image = ?, vehicle_Type = ?,vehicle_Trans = ?,vehicle_Cost = ?", car, (err, result) => {
        if (err) {
            res.send("Failure")
        } else {
            res.send("Success")
        }

    })
})

//Get specific model
route.get('/:model', (req, res) => {
    var arrVehicles = []   //Array to store all vehicles that we have
    var arrRented = []   //Array to store the rented vehicles
    var arrFinal = []   //Array to be sent to the frontend

    connect.query('SELECT * FROM vehicles where vehicle_Type = "' + req.params.model + '"', (err, result) => {
        if (err) {
            res.send("Failure Getting Model")
        } else {
            arrVehicles = result
            connect.query("SELECT vehicle_ID FROM rentedvehicles WHERE rented_Return > CURDATE();", (err1, result1) => {
                if (err1) {
                    res.send("Failure Getting Non Rented");
                } else {
                    let arrRented = result1;

                    for (let i = 0; i < arrVehicles.length; i++) {
                        let isRented = false;

                        for (let j = 0; j < arrRented.length; j++) {
                            if (arrVehicles[i].vehicle_ID === arrRented[j].vehicle_ID) {
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
route.get('/car/:id', (req, res) => {
    connect.query("Select * from vehicles where vehicle_ID = " + req.params.id, (err, result) => {
        if (err) {
            res.send("Failure")
        } else {
            res.send(result)
        }
    })
})

//Get all cars
route.get("/", (req, res) => {

    connect.query("Select * from vehicles", (err, result) => {
        if (err) {
            res.send("Loading Failure")
        } else {
            res.send(result)
        }
    })


})

//Get Available Cars
route.get("/available/car", (req, res) => {

    var arrVehicles = []   //Array to store all vehicles that we have
    var arrRented = []   //Array to store the rented vehicles
    var arrFinal = []   //Array to be sent to the frontend

    connect.query("SELECT * FROM vehicles ", (err, result) => {
        if (err) {
            res.send("Failure")
        } else {
            arrVehicles = result
            connect.query("SELECT vehicle_ID FROM rentedvehicles WHERE rented_Return > CURDATE();", (err1, result1) => {
                if (err1) {
                    res.send("Failure");
                } else {
                    let arrRented = result1;

                    for (let i = 0; i < arrVehicles.length; i++) {
                        let isRented = false;

                        for (let j = 0; j < arrRented.length; j++) {
                            if (arrVehicles[i].vehicle_ID === arrRented[j].vehicle_ID) {
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

export default route;

