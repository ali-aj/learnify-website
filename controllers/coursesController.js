const Courses = require('../models/Courses');
const User = require('../models/User'); 
const { verifyToken } = require('../service/auth');

// Controller method to render the courses page (Get request)
exports.coursesPage = async (req, res) => {
    const user = new User();
    const courses = new Courses();

    // Check if the user is authenticated
    if (req.cookies.token == undefined) {
        return res.redirect('/SignIn');
    }

    try {
        const user_payload = verifyToken(req.cookies.token);

        if (user_payload.role != 'teacher') {
            // Check if the URL contains a query parameter "category"
            const category = req.query.category;
            var courses_result;
            if (category) {
                courses_result = await courses.getCoursesByCategory(category);
            }
            else {
                courses_result = await courses.getAllCourses();
            }
    
            const user_result = await user.getUser(user_payload.username);
            const course_instructor_names = await user.getCourseInstructorName(courses_result);
            return res.render('courses', { isAuthenticated: true, username: user_payload.username, isTeacher: false, user: user_result[0], courses: courses_result, course_instructor_names: course_instructor_names });
        }
        else {
            return res.render('error', { message: 'page not found.', isTeacher: true });
        }
    }
    catch (error) {
        return res.redirect('/SignIn');
    }
};

exports.courseDetailsPage = async (req, res) => {
    const user = new User();
    const courses = new Courses();

    const course_result = await courses.getCourse(req.params.course_code);
    if (course_result.length == 0) {
        return res.redirect('/SignIn');
    }

    const course_instructor_name = await user.getCourseInstructorName(course_result);
    var user_payload = null;
    
    // Check if the user is authenticated
    if (req.cookies.token == undefined) {
        return res.redirect('/SignIn');
    }

    try {
        user_payload = verifyToken(req.cookies.token);
        const user_result = await user.getUser(user_payload.username);
        return res.render('courseDetails', { isAuthenticated: true, username: user_payload.username, user: user_result[0], isTeacher: user_payload.role == 'teacher' ? true : false, course: course_result[0], course_instructor_name: course_instructor_name[0] });
    }
    catch (error) {
        return res.redirect('/SignIn');
    }
}

exports.getCategoryImage = async (req, res) => {
    const courses = new Courses();
    const category = req.params.category;
    const category_image = await courses.getCategoryImage(category);
    if (category_image.length == 0) {
        return res.status(404).send('Category image not found');
    }
    return res.send(category_image[0].category_image);
}