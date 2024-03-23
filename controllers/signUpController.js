
// const User = require('../models/User');

// Controller method to render the sign-up page
exports.signUpPage = (req, res) => {
    res.render('signUp'); 
};

// Controller method to process sign-up form submission
exports.signUp = (req, res) => {
    // Retrieve form data from request body
    const { firstName, lastName, email, username, password } = req.body;

    // Perform validation (e.g., check if email/username is already in use, validate password strength, etc.)
    // For example:
    // const existingUser = await User.findOne({ email });

    // if (existingUser) {
    //     // User with this email already exists, render sign-up page with error message
    //     return res.render('signUp', { error: 'Email already in use' });
    // }

    // Create new user object and save to database
    // const newUser = new User({ firstName, lastName, email, username, password });
    // await newUser.save();

    // Redirect to sign-in page or dashboard upon successful sign-up
    // res.redirect('/SignIn');
};
