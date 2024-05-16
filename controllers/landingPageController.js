const Courses = require('../models/Courses');
const User = require('../models/User');

const user = new User();

// Controller method to render the landing page
exports.landingPage = async (req, res) => {
    // Check if the user is authenticated
    if (req.session.isLoggedIn && !req.session.isTeacher) {
        // If authenticated, render the landing page with user-specific content
        // You may fetch user data or perform other actions here
        const user_result = await user.getUser(req.session.username);
        res.render('landingPage', { isAuthenticated: true, username: req.session.username, isTeacher: false, user: user_result[0]});
    } else if (req.session.isTeacher) {
        res.render('error', { message: 'page not found.', isTeacher: true });
    } else {
        // If not authenticated, render the landing page with general content
        res.render('landingPage', { isAuthenticated: false, username: ''});
    }
};