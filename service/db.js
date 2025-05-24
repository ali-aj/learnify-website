const mysql = require('mysql2');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// MySQL Connection
const con = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
});

// Connect to the database
con.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Mongo DB Connection
const url = process.env.MONGO_URL; // MongoDB connection URL

// Create a new MongoClient
const client = new MongoClient(url); 

// Connect to MongoDB
const connectMongoDB = async () => {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
};

// Call the function to connect to MongoDB
connectMongoDB();

module.exports = { con, client };