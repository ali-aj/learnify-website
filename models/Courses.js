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

    async getCategoryImage(category_name) {
        const db = client.db('Learnify');
        const collection = db.collection('course_categories');
        return collection.findOne({ category_name }, { projection: { category_image: 1 } });
    }

    async incrementStudentsEnrolled(course_code) {
        const db = client.db('Learnify');
        const collection = db.collection('courses');
        collection.updateOne({ course_code }, { $inc: { students_enrolled: 1 } }, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Students enrolled incremented successfully');
            }
        });
    }

    async coursePrice(course_code) {
        const db = client.db('Learnify');
        const collection = db.collection('courses');
        return collection.findOne({ course_code }, { projection: { course_price: 1 } });
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
        return collection.find().project({ modules: 0 }).toArray();
    }

    async getCoursesByCategory(course_category) {
        const db = client.db('Learnify');
        const collection = db.collection('courses');
        return collection.find({ course_category }).project({ modules: 0 }).toArray();
    }

    async getCourses(course_teacher) {
        const db = client.db('Learnify');
        const collection = db.collection('courses');
        return collection.find({ course_teacher }).project({ modules: 0 }).toArray();
    }

    async getCoursesByCodes(course_codes) {
        const db = client.db('Learnify');
        const collection = db.collection('courses');
        return collection.find({ course_code: { $in: course_codes } }).project({ modules: 0 }).toArray();
    }

    async getCourse(course_code) {
        const db = client.db('Learnify');
        const collection = db.collection('courses');
        return collection.find({ course_code }).project({ modules: 0 }).toArray();
    }

    async getTopThreeCourses() {
        const db = client.db('Learnify');
        const collection = db.collection('courses');
        return collection.find().project({ modules: 0 }).sort({ students_enrolled: -1 }).limit(3).toArray();
    }

    async getCourseImage(course_code) {
        const db = client.db('Learnify');
        const collection = db.collection('courses');
        return collection.findOne({ course_code }, { projection: { course_image: 1 } });
    }
}

module.exports = Courses;