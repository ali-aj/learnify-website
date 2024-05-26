
const User = require('../models/User');
const multer = require('multer');
const { verifyToken } = require('../service/auth');

const user = new User();

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('profile_image');

// Get Request
exports.userProfilePage = async (req, res) => {
    if (req.cookies.token == undefined) {
        return res.render('error', { message: 'you are not authenticated.' });
    }

    const user_payload = verifyToken(req.cookies.token);
    const user_result = await user.getUser(user_payload.username);
    
    if (user_result.length > 0) {
        res.render('userProfile', { isAuthenticated: true, username: user_payload.username, isTeacher: user_payload.role == 'teacher' ? true : false, user: user_result[0]});
    } else {
        res.render('error', { message: 'you are not authenticated.' });
    }
};

// Get Request
exports.getProfileImage = async (req, res) => {
    if (req.cookies.token == undefined) {
        return res.render('error', { error: 'you are not authenticated.', isTeacher: false });
    }
    const token = req.cookies.token;
    const user_payload = verifyToken(token);

    const user_result = await user.getUser(user_payload.username);

    if (user_result.length > 0 && user_result[0].profile_image) {
        res.contentType('image/png'); 
        res.send(user_result[0].profile_image);
    } else {
        res.status(404).send('Image not found');
    }
}

// Post Request
exports.updateUserProfile = async (req, res) => {
    upload(req, res, async (err) => {
        if (req.cookies.token == undefined) {
            return res.render('error', { error: 'you are not authenticated.' });
        }

        if (err) {
            return res.render('error', { message: 'file upload failed.' });
        }

        const { first_name, last_name, date_of_birth, phone_number, email, address, facebook, twitter, linkedin, instagram, dribble, pinterest, oldPassword, newPassword, confirmPassword } = req.body;
        let profile_image = req.file ? req.file.buffer : null;

        const user_payload = verifyToken(req.cookies.token);

        await user.updateUserProfile(first_name, last_name, date_of_birth, phone_number, email, address, facebook, twitter, linkedin, instagram, dribble, pinterest, profile_image, user_payload.username);
        res.redirect(`/${user_payload.username}/profile`);
    });
};
