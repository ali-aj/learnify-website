const { query } = require('express');
const mysql = require('mysql2');

class User {
    constructor() {
        this.con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "57365736",
            database: "learnify"
        });

        // Connect to the database
        this.con.connect((err) => {
            if (err) {
                console.error('Error connecting to database:', err);
            } else {
                console.log('Connected to database');
            }
        });
    }

    // Close the database connection
    closeConnection() {
        this.con.end((err) => {
            if (err) {
                console.error('Error closing database connection:', err);
            } else {
                console.log('Database connection closed');
            }
        });
    }

    checkEmailDuplicate(email, callback) {
        this.con.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results);
        });
    }

    checkUserNameDuplicate(username, callback) {
        this.con.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results);
        });
    }

    authenticate(username, password, callback) {
        const query_str = 'SELECT * FROM users WHERE username = "' + username + '" AND password = "' + password + '"'
        this.con.query(query_str, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results);
        });
    }

    updatePassword(email, password, callback) {
        const query_str = 'UPDATE users SET password = "' + password + '" WHERE email = "' + email + '"';
        this.con.query(query_str, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results);
        });
    }

    getOTP(email, callback) {
        this.con.query('SELECT otp FROM users WHERE email = ?', [email], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results);
        });
    }

    addOTP(email, OTP, callback) {
        const query_str = 'UPDATE users SET otp = ' + OTP + ' WHERE email = "' + email + '"';
        this.con.query(query_str, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results);
        });
    }
}

module.exports = User;
