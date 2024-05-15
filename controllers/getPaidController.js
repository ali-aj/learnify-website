const Courses = require('../models/Courses');
const User = require('../models/User');

exports.getPaidPage = (req, res) => {
    // Check if the user is authenticated
    if (req.session.isLoggedIn && req.session.isTeacher) {
        res.render('getPaid', { isAuthenticated: true, username: req.session.username });
    }
    else {
        res.render('error', { message: 'you are not authenticated.' });
    }
};