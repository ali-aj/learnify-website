
const User = require('../models/User');
const nodemailer = require('nodemailer');

const user = new User();

exports.forgetPasswordPage = (req, res) => {
    res.render('forgetPassword', { email: '', user_exist: '', status: '' });
};

exports.resetPassword = (req, res) => {
    // Retrieve token and new password from request body
    const otp = req.body.otp;
    const password = req.body.password;
    const email = req.body.email;

    // Check if OTP is correct
    user.getOTP(email, (err, results) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            if (results[0].otp == otp) {
                // Update the user's password
                user.updatePassword(email, password, (err, results) => {
                    if (err) {
                        return res.status(500).send('Internal Server Error');
                    }
                    // Redirect to the sign-in page
                    res.render('signIn', { error: '' });
                });
            } else {
                // Incorrect OTP, render forget-password page with error message
                res.render('forgetPassword', { email: email, user_exist: 'True', status: 'Fail' });
            }
        } else {
            // No OTP found, render forget-password page with error message
            res.render('forgetPassword', { email: email, user_exist: 'True', status: '' });
        }
    });
};



exports.sendOTP = (req, res) => {
    // Retrieve email from request body
    const email = req.body.email;

    user.checkEmailDuplicate(email, (err, emailResults) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }

        if (emailResults.length > 0) {
            // Generate a random OTP (e.g., 6-digit number)
            const OTP = Math.floor(100000 + Math.random() * 900000);

            // Set up nodemailer transporter
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'example@gmail.com', // Your Gmail email address
                    pass: '' // Your Gmail password or App password if you have 2-step verification enabled
                }
            });

            // Email options
            const mailOptions = {
                from: 'example@gmail.com', // Your Gmail email address
                to: email,
                subject: 'OTP Verification',
                text: `Your OTP for verification is: ${OTP}`
            };

            // Send email with OTP
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                    // Handle error, e.g., render an error page
                    res.render('error', { message: 'Failed to send OTP. Please try again later.' });
                } else {
                    // Save the OTP to the database
                    user.addOTP(email, OTP, (err, results) => {
                        if (err) {
                            return res.status(500).send('Internal Server Error');
                        }
                    });
                    // Redirect to a page where the user can enter the OTP for verification
                    res.render('forgetPassword', { email: email, user_exist: 'True', status: '' });
                }
            });
        }
        else {
            // User with this email does not exist, render forget-password page with error message
            res.render('forgetPassword', { email: '', user_exist: 'False', status: '' });
        }
    });

};

exports.changePassword = (req, res) => {
    const OTP = req.body.otp;

    if (OTP == '') {
        this.sendOTP(req, res);
    }
    else {
        this.resetPassword(req, res);
    }
}