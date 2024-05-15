const Courses = require('../models/Courses');
const User = require('../models/User');

exports.mylearningPage = (req, res) => {
    // Check if the user is authenticated
    if (req.session.isLoggedIn) {
        res.render('myLearnings', { isAuthenticated: true, username: req.session.username });
    }
    else {
        res.render('error', { message: 'you are not authenticated.' });
    }
};