const Courses = require('../models/Courses');
const User = require('../models/User');
const { verifyToken } = require('../service/auth');

const user = new User();

exports.mylearningPage = async (req, res) => {
    // Check if the user is authenticated
    if (req.cookies.token == undefined) {
        return res.render('error', { message: 'you are not authenticated.', isTeacher: false });
    }

    const token = req.cookies.token;
    const user_payload = verifyToken(token);
    
    if (user_payload.role != 'teacher') {
        const user_result = await user.getUser(user_payload.username);
        return res.render('myLearnings', { isAuthenticated: true, username: user_payload.username, isTeacher: false, user: user_result[0]});
    }
    else {
        return res.render('error', { message: 'page not found.', isTeacher: true });
    }
};