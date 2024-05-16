const Courses = require('../models/Courses');
const User = require('../models/User');

const user = new User();

exports.getPaidPage = async (req, res) => {
    // Check if the user is authenticated
    if (req.session.isLoggedIn && req.session.isTeacher) {
        const user_result = await user.getUser(req.session.username);
        res.render('getPaid', { isAuthenticated: true, username: req.session.username, isTeacher: req.session.isTeacher, user: user_result[0]});
    }
    else if (req.session.isLoggedIn && !req.session.isTeacher) {
        res.render('error', { message: 'page not found.', isTeacher: false });
    }
    else {
        res.render('error', { message: 'you are not authenticated.', isTeacher: true });
    }
};