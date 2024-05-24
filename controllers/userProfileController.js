
const User = require('../models/User');
const multer = require('multer');

const user = new User();

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('profile_image');

// Get Request
exports.userProfilePage = async (req, res) => {
    if (req.session.isLoggedIn) {
        const user_result = await user.getUser(req.session.username);
        // console.log(user_result);
        
        res.render('userProfile', { isAuthenticated: true, username: req.session.username, isTeacher: req.session.isTeacher, user: user_result[0]});
    }
    else {
        res.render('error', { message: 'you are not authenticated.', isTeacher: req.session.isTeacher});
    } 
};

// Get Request
exports.getProfileImage = async (req, res) => {
    if (req.session.isLoggedIn && req.params.username === req.session.username) {
        const username = req.session.username;
        const user_result = await user.getUser(username);
        
        if (user_result.length > 0 && user_result[0].profile_image) {
            res.contentType('image/png'); 
            res.send(user_result[0].profile_image);
        } else {
            res.status(404).send('Image not found');
        }
    }
}

// Post Request
exports.updateUserProfile = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.render('error', { message: 'file upload failed.' });
        }

        const { first_name, last_name, date_of_birth, phone_number, email, address, facebook, twitter, linkedin, instagram, dribble, pinterest, oldPassword, newPassword, confirmPassword } = req.body;
        let profile_image = req.file ? req.file.buffer : null;

        if (oldPassword && newPassword && confirmPassword) {
            const user_result = await user.getUser(req.session.username);
            const hashedPassword = user_result[0].password;
            const isPasswordMatch = await user.validatePassword(oldPassword, hashedPassword);
            if (!isPasswordMatch) {
                return res.render('error', { message: 'old password is incorrect.' });
            }
            const hashedNewPassword = await user.hashPassword(newPassword);
            await user.updatePassword(hashedNewPassword, req.session.username);
        }

        await user.updateUserProfile(first_name, last_name, date_of_birth, phone_number, email, address, facebook, twitter, linkedin, instagram, dribble, pinterest, profile_image, req.session.username);
        res.redirect(`/${req.session.username}/profile`);
    });
};
