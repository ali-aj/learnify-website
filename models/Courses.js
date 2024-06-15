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

    async deleteCourse(course_code) {
        const db = client.db('Learnify');
        const collection = db.collection('courses');
        collection.deleteOne({ course_code }, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Course deleted successfully');
            }
        });
    }

    async getCourseCategories() {
        const db = client.db('Learnify');
        const collection = db.collection('course_categories');
        return collection.find().toArray();
    }

    async getAllCourses() {
        const db = client.db('Learnify');
        const collection = db.collection('courses');
        return collection.find().toArray();
    }

    async getCourses(course_teacher) {
        const db = client.db('Learnify');
        const collection = db.collection('courses');
        return collection.find({ course_teacher }).toArray();
    }

    async getCourse(course_code) {
        const db = client.db('Learnify');
        const collection = db.collection('courses');
        return collection.find({ course_code }).toArray();
    }

    async getTopThreeCourses() {
        const db = client.db('Learnify');
        const collection = db.collection('courses');
        return collection.find().sort({ students_enrolled: -1 }).limit(3).toArray();
    }

    async getCourseImage(course_code) {
        const db = client.db('Learnify');
        const collection = db.collection('courses');
        return collection.findOne({ course_code }, { projection: { course_image: 1 } });
    }
}

module.exports = Courses;