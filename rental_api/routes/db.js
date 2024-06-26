import mysql2 from "mysql2/promise"

const dbPool = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "Mhlabunzima1*",
    database: "sneakerdb",
    waitForConnections: true,
    connectionLimit: 20, // Adjust as per your requirements
    queueLimit: 0,
    connectTimeout: 30000
});

export default dbPool;