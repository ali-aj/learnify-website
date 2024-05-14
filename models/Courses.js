class Courses {
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
}

module.exports = Courses;