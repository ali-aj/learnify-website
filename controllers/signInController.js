
const User = require('../models/User');

const user = new User();

// Controller method to render the sign-in page
exports.signInPage = (req, res) => {
    res.render('signIn', {error: ''}); 
};

// Controller method to process sign-in form submission
exports.signIn = (req, res) => {
    // Retrieve username and password from request body
    const username = req.body.username;
    const password = req.body.password;

    user.authenticate(username, password, (err, userResult) => {
        if (err) {
            console.error('Error checking user:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (userResult.length > 0) {
            // Authentication successful, redirect to dashboard or homepage
            res.redirect('/Home');
        }
        else{
            // Authentication failed, render sign-in page with error message
            res.render('signIn', { error: 'Invalid username or password' });
        }
    });
};
