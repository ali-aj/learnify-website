const { client } = require('../service/db');

class Courses {

    async insertCourse(course_details) {
        const db = client.db('Learnify');
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