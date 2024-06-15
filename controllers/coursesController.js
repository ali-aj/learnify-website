const Courses = require('../models/Courses');
const User = require('../models/User'); 
const { verifyToken } = require('../service/auth');

const user = new User();
const courses = new Courses();

// Controller method to render the courses page (Get request)
exports.coursesPage = async (req, res) => {
    // Check if the user is authenticated
    if (req.cookies.token == undefined) {
        return res.render('error', { message: 'you are not authenticated.', isTeacher: false });
    }

    const user_payload = verifyToken(req.cookies.token);

    if (user_payload.role != 'teacher') {
        const user_result = await user.getUser(user_payload.username);
        const courses_result = await courses.getAllCourses();
        const course_instructor_names = await user.getCourseInstructorName(courses_result);
        return res.render('courses', { isAuthenticated: true, username: user_payload.username, isTeacher: false, user: user_result[0], courses: courses_result, course_instructor_names: course_instructor_names });
    }
    else {
        return res.render('error', { message: 'page not found.', isTeacher: true });
    }
};

exports.courseDetailsPage = async (req, res) => {
    const course_result = await courses.getCourse(req.params.course_code);
    if (course_result.length == 0) {
        return res.render('error', {message: 'course not found.', isTeacher: false});
    }

    const course_instructor_name = await user.getCourseInstructorName(course_result);
    var user_payload = null;
    
    // Check if the user is authenticated
    if (req.cookies.token == undefined) {
        return res.render('courseDetails', { isAuthenticated: false, username: user_payload, user: null, isTeacher: false, course: course_result[0], course_instructor_name: course_instructor_name[0] });
    }

    user_payload = verifyToken(req.cookies.token);
    const user_result = await user.getUser(user_payload.username);
    return res.render('courseDetails', { isAuthenticated: true, username: user_payload.username, user: user_result[0], isTeacher: user_payload.role == 'teacher' ? true : false, course: course_result[0], course_instructor_name: course_instructor_name[0] });
}