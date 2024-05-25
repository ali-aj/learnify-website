const Courses = require('../models/Courses');
const User = require('../models/User');
const multer = require('multer');

const user = new User();
const courses = new Courses();

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('course_image');

// Controller method to render the courses page
exports.manageCoursesPage = async (req, res) => {
    // Check if the user is authenticated
    if (req.session.isLoggedIn && req.session.isTeacher) {
        const user_result = await user.getUser(req.session.username);
        res.render('manageCourses', { isAuthenticated: true, username: req.session.username, isTeacher: req.session.isTeacher, user: user_result[0]});
    }
    else if (req.session.isLoggedIn && !req.session.isTeacher) {
        res.render('error', { message: 'page not found.', isTeacher: false });
    }
    else {
        res.redirect('/');
    }
};

// Get request
exports.addCoursePage = async (req, res) => {
    // Check if the user is authenticated
    if (req.session.isLoggedIn && req.session.isTeacher) {
        const user_result = await user.getUser(req.session.username);
        res.render('addCourse', { isAuthenticated: true, username: req.session.username, isTeacher: req.session.isTeacher, user: user_result[0]});
    }
    else if (req.session.isLoggedIn && !req.session.isTeacher) {
        res.render('error', { message: 'page not found.', isTeacher: false });
    }
    else {
        res.render('error', { message: 'you are not authenticated.', isTeacher: true });
    }
}

// Post request
exports.addCourse = async (req, res) => {
    upload(req, res, async (err) => {
        if (req.session.isLoggedIn && req.session.isTeacher) {
            if (err) {
                return res.render('error', { message: 'file upload failed.' });
            }

            const course_details = {
                course_name: req.body.course_name,
                course_code: req.body.course_code,
                course_price: req.body.course_price,
                course_duration: req.body.course_duration,
                course_description: req.body.course_description,
                course_teacher: req.session.username,
                students_enrolled: 0,
                course_image: req.file ? req.file.buffer : null
            };

            courses.insertCourse(course_details);
            res.redirect('/manageCourses');
        }
        else if (req.session.isLoggedIn && !req.session.isTeacher) {
            res.render('error', { message: 'page not found.', isTeacher: false });
        }
        else {
            res.render('error', { message: 'you are not authenticated.', isTeacher: true });
        }
    });
}