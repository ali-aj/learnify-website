
// const User = require('../models/User');

// Controller method to render the sign-in page
exports.signInPage = (req, res) => {
    res.render('signIn'); 
};

// Controller method to process sign-in form submission
exports.signIn = (req, res) => {
    // Retrieve username and password from request body
    const { username, password } = req.body;

    // Perform authentication logic (e.g., check credentials against database)
    // For example:
    // const user = await User.findOne({ username });

    // Check if user exists and password is correct
    // if (user && user.authenticate(password)) {
    //     // Authentication successful, redirect to dashboard or homepage
    //     res.redirect('/home');
    // } else {
    //     // Authentication failed, render sign-in page with error message
    //     res.render('signIn', { error: 'Invalid username or password' });
    // }
};
