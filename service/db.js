const mysql = require('mysql2');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// MySQL Connection
const con = mysql.createConnection({
    host: process.env.sqlHost,
    user: process.env.sqlUser,
    password: process.env.sqlPassword,
    database: process.env.sqlDatabase
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
const url = process.env.mongoUrl;

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