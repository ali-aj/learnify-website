const Courses = require('../models/Courses');
const User = require('../models/User');
const { verifyToken } = require('../service/auth');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.mylearningPage = async (req, res) => {

    // Check if the user is authenticated
    if (req.cookies.token == undefined) {
        return res.redirect('/SignIn');
    }

    try {
        const user_payload = verifyToken(req.cookies.token);
    
        if (user_payload.role != 'teacher') {
            const user = new User();
            const course = new Courses();

            const user_result = await user.getUser(user_payload.username);
            const student_courses = await user.getStudentCourses(user_payload.username);
            const course_codes = student_courses.map(c => c.course_code);
            const student_courses_details = await course.getCoursesByCodes(course_codes);

            const course_instructor_names = await user.getCourseInstructorName(student_courses_details);

            return res.render('myLearnings', { username: user_payload.username, user: user_result[0], student_courses: student_courses, student_courses_details: student_courses_details, course_instructor_names: course_instructor_names });
        }
        else {
            return res.render('error', { message: 'page not found.', isTeacher: true });
        }
    }
    catch (error) {
        console.error('Error:', error.message);
        return res.render('error', { message: error.message, isTeacher: false });
    }
};

exports.enrollCourse = async (req, res) => {

    // Check if the user is authenticated
    if (req.cookies.token == undefined) {
        return res.redirect('/SignIn');
    }

    try {
        const user_payload = verifyToken(req.cookies.token);

        if (user_payload.role != 'teacher') {
            const course = new Courses();

            const course_code = req.query.course_code;
            const course_price = await course.coursePrice(course_code);
            if (course_price != 0) {
                return res.redirect(`/checkout?course_code=${course_code}`);
            }

            const user = new User();
            await user.enrollCourse(user_payload.username, course_code, course_price);
            return res.redirect('/my-learnings');
        }
        else {
            return res.render('error', { message: 'page not found.', isTeacher: true });
        }
    }
    catch {
        return res.redirect('/SignIn');
    }
}

// Get requet
exports.checkoutPage = async (req, res) => {

    // Check if the user is authenticated
    if (req.cookies.token == undefined) {
        return res.redirect('/SignIn');
    }

    try {
        const user_payload = verifyToken(req.cookies.token);

        if (user_payload.role != 'teacher') {
            const user = new User();
            const course = new Courses();

            const course_code = req.query.course_code;
            const course_price = await course.coursePrice(course_code);

            const user_result = await user.getUser(user_payload.username);
            return res.render('checkout', { username: user_payload.username, user: user_result[0], course_code: course_code, course_price: course_price.course_price }); 
        }
        else {
            return res.render('error', { message: 'page not found.', isTeacher: true });
        }
    }
    catch {
        return res.redirect('/SignIn');
    }
}