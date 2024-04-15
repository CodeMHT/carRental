import mysql2 from "mysql2";
import fs from "fs"



const dbPool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    ssl: {
        ca: fs.readFileSync('DigiCertGlobalRootCA.crt.pem')
    },

    waitForConnections: true,
    connectionLimit: 15,
    queueLimit: 0 // Unlimited queueing
})

export { dbPool };