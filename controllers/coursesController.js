const Courses = require('../models/Courses');


// Controller method to render the courses page
exports.coursesPage = (req, res) => {
    // Check if the user is authenticated
    if (req.session.isLoggedIn) {
        res.render('courses', { isAuthenticated: true, username: req.session.username });
    }
    else {
        res.render('error', { message: 'you are not authenticated.' });
    }
};