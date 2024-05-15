const Courses = require('../models/Courses');


// Controller method to render the courses page
exports.manageCoursesPage = (req, res) => {
    // Check if the user is authenticated
    if (req.session.isLoggedIn && req.session.isTeacher) {
        res.render('manageCourses', { isAuthenticated: true, username: req.session.username });
    }
    else {
        res.render('error', { message: 'you are not authenticated.' });
    }
};