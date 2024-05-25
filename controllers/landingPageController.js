const Courses = require('../models/Courses');
const User = require('../models/User');
const { verifyToken } = require('../service/auth');

const user = new User();

// Controller method to render the landing page
exports.landingPage = async (req, res) => {
    try {
        if (req.cookies.token == undefined) {
            return res.render('landingPage', { isAuthenticated: false, username: ''});
        }
        const token = req.cookies.token;
        const user_payload = verifyToken(token);

        const user_result = await user.getUser(user_payload.username);

        if (user_result[0].role == 'teacher') {
            return res.redirect('/manageCourses');
        }
        else {
            return res.render('landingPage', { isAuthenticated: true, username: user_payload.username, isTeacher: false, user: user_result[0]});
        }

    } catch (error) {
        return res.render('landingPage', { isAuthenticated: false, username: ''});
    }
};