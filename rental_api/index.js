import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";

//Imports for my routes
import userRoute from "./routes/authenticate.js";
import vehicleRoute from "./routes/vehicles.js";
import rentRoute from "./routes/rentals.js";
import financialRoute from "./routes/financial.js";
import reportRoute from "./routes/reports.js";


const app = express();
const PORT = 5100;

app.use(bodyParser.json());
app.use(express.static('./images')) //in order for frontend to view the images

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
    methods: '*'
}

app.use(cors(corsOptions)) // Use this after the variable declaration

//Routes
app.use("/user", userRoute)
app.use("/vehicle", vehicleRoute)
app.use("/rental", rentRoute)
app.use("/finance", financialRoute)
app.use("/reports", reportRoute)

//Starting the server
app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));