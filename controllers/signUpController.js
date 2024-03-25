const User = require('../models/User');

// Controller method to render the sign-up page
exports.signUpPage = (req, res) => {
    res.render('signUp', {error: ''}); 
};

// Create a new instance of the User model
const user = new User();

// Controller method to process sign-up form submission
exports.signUp = (req, res) => {
    // Retrieve form data from request body
    const role = req.body.role;
    const first_name = req.body.firstName;
    const last_name = req.body.lastName;
    const email = req.body.emailField;
    const phone_number = req.body.numberField;
    const date_of_birth = req.body.dateOfBirth;
    const address = req.body.addressField;
    const username = req.body.username;
    const password = req.body.passwordField;

    // Check if email is already in use
    user.checkEmailDuplicate(email, (err, emailResults) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }

        if (emailResults.length > 0) {
            // User with this email already exists, render sign-up page with error message
            return res.render('signUp', { error: 'Email already in use' });
        } else {
            // Check if username is already in use
            user.checkUserNameDuplicate(username, (err, usernameResults) => {
                if (err) {
                    console.error('Error checking username duplicate:', err);
                    return res.status(500).send('Internal Server Error');
                }

                if (usernameResults.length > 0) {
                    // User with this username already exists, render sign-up page with error message
                    return res.render('signUp', { error: 'Username already in use' });
                } else {
                    // Create new user and save to database
                    const newUser = {
                        role,
                        first_name,
                        last_name,
                        email,
                        phone_number,
                        date_of_birth,
                        address,
                        username,
                        password
                    };
                    user.con.query('INSERT INTO users SET ?', newUser, (err, result) => {
                        if (err) {
                            console.error('Error creating new user:', err);
                            return res.status(500).send('Internal Server Error');
                        }
                        console.log('New user created:', result.insertId);
                        // Redirect to sign-in page or dashboard upon successful sign-up
                        res.redirect('/SignIn');
                    });
                }
            });
        }
    });
};