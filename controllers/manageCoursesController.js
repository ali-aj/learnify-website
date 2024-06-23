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
    { name: 'module_video_file_1', maxCount: 1 },
    { name: 'module_video_file_2', maxCount: 1 },
    { name: 'module_video_file_3', maxCount: 1 },
    { name: 'module_video_file_4', maxCount: 1 },
    { name: 'module_video_file_5', maxCount: 1 },
    { name: 'module_video_file_6', maxCount: 1 },
    { name: 'module_video_file_7', maxCount: 1 },
    { name: 'module_video_file_8', maxCount: 1 },
    { name: 'module_video_file_9', maxCount: 1 },
    { name: 'module_video_file_10', maxCount: 1 }
]);

// Controller method to render the manage courses page (Get request)
exports.manageCoursesPage = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.cookies.token) {
            return res.render('error', { message: 'Page not found.', isTeacher: false });
        }

        const user_payload = verifyToken(req.cookies.token);
        if (user_payload.role === 'teacher') {
            const user_result = await user.getUser(user_payload.username);
            const courses_result = await courses.getCourses(user_payload.username);
            return res.render('manageCourses', {
                isAuthenticated: true,
                username: user_payload.username,
                isTeacher: true,
                user: user_result[0],
                courses: courses_result
            });
        } else {
            return res.render('error', { message: 'Page not found.', isTeacher: false });
        }
    } catch (err) {
        console.error(err);
        return res.render('error', { message: 'An error occurred.', isTeacher: false });
    }
};

// Get request
exports.addCoursePage = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.cookies.token) {
            return res.render('error', { message: 'Page not found.', isTeacher: false });
        }

        const user_payload = verifyToken(req.cookies.token);
        if (user_payload.role === 'teacher') {
            const user_result = await user.getUser(user_payload.username);
            const course_categories = await courses.getCourseCategories();
            return res.render('addCourse', {
                isAuthenticated: true,
                username: user_payload.username,
                isTeacher: true,
                user: user_result[0],
                course_categories: course_categories
            });
        } else {
            return res.render('error', { message: 'You are not authenticated.', isTeacher: true });
        }
    } catch (err) {
        console.error(err);
        return res.render('error', { message: 'An error occurred.', isTeacher: true });
    }
}

// Post request
exports.addCourse = async (req, res) => {
    upload(req, res, async (err) => {
        try {
            if (!req.cookies.token) {
                return res.render('error', { message: 'You are not authenticated.', isTeacher: true });
            }

            const user_payload = verifyToken(req.cookies.token);
            if (user_payload.role === 'teacher') {
                if (err) {
                    return res.render('error', { message: 'File upload failed.', isTeacher: true });
                }

                const modules = [];
                for (let i = 1; i <= 10; i++) {
                    const title = req.body[`module_video_title_${i}`];
                    const description = req.body[`module_video_description_${i}`];
                    const video = req.files[`module_video_file_${i}`] ? req.files[`module_video_file_${i}`][0].buffer : null;

                    if (title || description || video) {
                        modules.push({
                            title: title,
                            video: video,
                            description: description
                        });
                    }
                }

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
                    course_image: req.files.course_image ? req.files.course_image[0].buffer : null,
                    modules: modules,
                    modules_count: modules.length
                };

                await courses.insertCourse(course_details);
                return res.redirect('/manageCourses');
            } else {
                return res.render('error', { message: 'Page not found.', isTeacher: false });
            }
        } catch (err) {
            console.error(err);
            return res.render('error', { message: 'An error occurred while adding the course.', isTeacher: true });
        }
    });
}

exports.getCourseImage = async (req, res) => {
    try {
        const course_code = req.params.course_code;
        const course = await courses.getCourseImage(course_code);

        if (course && course.course_image) {
            res.contentType('image/png');
            res.send(course.course_image.buffer);
        } else {
            res.status(404).send('Image not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching the image.');
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const course_code = req.params.course_code;
        const user_payload = verifyToken(req.cookies.token);

        if (user_payload.role === 'teacher') {
            await courses.deleteCourse(course_code);
            return res.redirect('/manageCourses');
        } else {
            return res.render('error', { message: 'Page not found.', isTeacher: false });
        }
    } catch (err) {
        console.error(err);
        return res.render('error', { message: 'An error occurred while deleting the course.', isTeacher: true });
    }
}