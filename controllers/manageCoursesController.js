const Courses = require('../models/Courses');
const User = require('../models/User');
const multer = require('multer');
const { verifyToken } = require('../service/auth');

const user = new User();
const courses = new Courses();

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('course_image');

// Controller method to render the courses page (Get request)
exports.manageCoursesPage = async (req, res) => {
    // Check if the user is authenticated
    if (req.cookies.token == undefined) {
        return res.render('error', { message: 'page not found.', isTeacher: false });
    }
    const user_payload = verifyToken(req.cookies.token);
    if (user_payload.role == 'teacher') {
        const user_result = await user.getUser(user_payload.username);
        return res.render('manageCourses', { isAuthenticated: true, username: user_payload.username, isTeacher: true, user: user_result[0] });
    }
    else {
        return res.render('error', { message: 'page not found.', isTeacher: false });
    }
};

// Get request
exports.addCoursePage = async (req, res) => {
    // Check if the user is authenticated
    if (req.cookies.token == undefined) {
        return res.render('error', { message: 'page not found.', isTeacher: false });
    }
    
    const user_payload = verifyToken(req.cookies.token);
    if (user_payload.role == 'teacher') {
        const user_result = await user.getUser(user_payload.username);
        return res.render('addCourse', { isAuthenticated: true, username: user_payload.username, isTeacher: true, user: user_result[0]});
    }
    else {
        return res.render('error', { message: 'you are not authenticated.', isTeacher: true });
    }
}

// Post request
exports.addCourse = async (req, res) => {
    upload(req, res, async (err) => {
        if (req.cookies.token == undefined) {
            return res.render('error', { message: 'you are not authenticated.', isTeacher: true });
        }

        const user_payload = verifyToken(req.cookies.token);
        if (user_payload.role == 'teacher') {
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
            return res.redirect('/manageCourses');
        }
        else {
            return res.render('error', { message: 'page not found.', isTeacher: false });
        }
    });
}