const Courses = require('../models/Courses');
const User = require('../models/User');
const multer = require('multer');
const { verifyToken } = require('../service/auth');

const user = new User();
const courses = new Courses();

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage }).fields([
    { name: 'course_image', maxCount: 1 },
    { name: 'module_video_file', maxCount: 10 } 
]);

// Controller method to render the manage courses page (Get request)
exports.manageCoursesPage = async (req, res) => {
    // Check if the user is authenticated
    if (req.cookies.token == undefined) {
        return res.render('error', { message: 'page not found.', isTeacher: false });
    }
    const user_payload = verifyToken(req.cookies.token);
    if (user_payload.role == 'teacher') {
        const user_result = await user.getUser(user_payload.username);
        const courses_result = await courses.getCourses(user_payload.username);
        return res.render('manageCourses', { isAuthenticated: true, username: user_payload.username, isTeacher: true, user: user_result[0], courses: courses_result });
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
        const course_categories = await courses.getCourseCategories();
        return res.render('addCourse', { isAuthenticated: true, username: user_payload.username, isTeacher: true, user: user_result[0], course_categories: course_categories });
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
                return res.render('error', { message: 'file upload failed.', isTeacher: true });
            }

            console.log(req.body);

            const modules = req.body.modules.map((module, index) => {
                return {
                    title: module.module_video_title,
                    video: req.files.module_video_file ? req.files.module_video_file[index].buffer : null,
                    description: module.module_video_description
                };
            });
    
            const course_details = {
                course_name: req.body.course_name,
                course_code: req.body.course_code,
                course_price: req.body.course_price,
                course_duration: req.body.course_duration,
                skill_level: req.body.skill_level,
                language: req.body.language,
                course_category: req.body.course_category,
                course_description: req.body.course_description,
                course_teacher: user_payload.username,
                students_enrolled: 0,
                course_image: req.file ? req.file.buffer : null,
                modules: modules
            };
    
            courses.insertCourse(course_details);
            return res.redirect('/manageCourses');
        }
        else {
            return res.render('error', { message: 'page not found.', isTeacher: false });
        }
    });
}

exports.getCourseImage = async (req, res) => {
    const course_code = req.params.course_code;
    const course = await courses.getCourseImage(course_code);

    if (course && course.course_image) {
        res.contentType('image/png');
        res.send(course.course_image.buffer);
    } else {
        res.status(404).send('Image not found');
    }
}

exports.deleteCourse = async (req, res) => {
    const course_code = req.params.course_code;
    const user_payload = verifyToken(req.cookies.token);
    if (user_payload.role == 'teacher') {
        try {
            courses.deleteCourse(course_code);
            return res.redirect('/manageCourses');
        } catch (err) {
            return res.render('error', { message: 'An error occurred while deleting the course.', isTeacher: true });
        }
    }
    else {
        return res.render('error', { message: 'page not found.', isTeacher: false });
    }
}