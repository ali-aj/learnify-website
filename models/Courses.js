const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

class Courses {
    constructor() {
        // Connection URL
        const url = process.env.mongoUrl;

        // Create a new MongoClient
        this.client = new MongoClient(url); 
    }

    async connect() {
        try {
            await this.client.connect();
            console.log("Connected successfully to MongoDB");
        } catch (err) {
            console.error("Failed to connect to MongoDB", err);
        }
    }

    async insertCourse(course_details) {
        await this.connect();
        const db = this.client.db('Learnify');
        const collection = db.collection('courses');
        collection.insertOne(course_details, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Course added successfully');
            }
        });
    }
}

module.exports = Courses;