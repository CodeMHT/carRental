import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import client from "./db.js";


//Imports for my routes
import userRoute from "./routes/authenticate.js";
import vehicleRoute from "./routes/vehicles.js";
import rentRoute from "./routes/rentals.js";
import financialRoute from "./routes/financial.js";
import reportRoute from "./routes/reports.js";

const app = express();
const PORT = 5100;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('./images')) //in order for frontend to view the images

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
    methods: '*'
}

//establish database connection 
client.connect((err, result) => {
    if (err) {
        console.log("Error connecting Database: " + err)
    }
})

app.use(cors(corsOptions))


//Default Route 
app.get("/", async (req, res) => {

    res.send("API Up and Live")
})
//Routes

app.use("/user", userRoute)
app.use("/vehicle", vehicleRoute)
app.use("/rental", rentRoute)
app.use("/finance", financialRoute)
app.use("/reports", reportRoute)


//Starting the server
app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));



