const Courses = require('../models/Courses');
const User = require('../models/User');
const { verifyToken } = require('../service/auth');

const user = new User();
const courses = new Courses();

// Controller method to render the landing page
exports.landingPage = async (req, res) => {
    const instructors_result = await user.getInstructors();
    const courses_result = await courses.getTopThreeCourses();
    const course_instructor_names = await user.getCourseInstructorName(courses_result);
    const course_categories = await courses.getCourseCategories();        

    try {
        if (req.cookies.token == undefined) {
            return res.render('landingPage', { isAuthenticated: false, username: '', isTeacher: false, courses: courses_result, instructors: instructors_result, course_instructor_names: course_instructor_names, course_categories: course_categories });
        }
        const token = req.cookies.token;
        const user_payload = verifyToken(token);

        const user_result = await user.getUser(user_payload.username);

        if (user_result[0].role == 'teacher') {
            return res.redirect('/manageCourses');
        }
        else {
            return res.render('landingPage', { isAuthenticated: true, username: user_payload.username, isTeacher: false, user: user_result[0], courses: courses_result, instructors: instructors_result, course_instructor_names: course_instructor_names, course_categories: course_categories });
        }

    } catch (error) {
        return res.render('landingPage', { isAuthenticated: false, username: '', isTeacher: false, courses: courses_result, instructors: instructors_result, course_instructor_names: course_instructor_names, course_categories: course_categories });
    }
};