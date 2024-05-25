const User = require('../models/User');
const { createToken } = require('../service/auth');


// Controller method to render the sign-in page (GET request)
exports.signInPage = (req, res) => {
    res.render('signIn', {error: ''}); 
};

// Controller method to process sign-in form submission (POST request)
exports.signIn = async (req, res) => {
    // Retrieve username and password from request body
    const username = req.body.username;
    const password = req.body.password;

    const user = new User();

    try {
        const userResult = await user.authenticate(username, password);
        
        if (userResult) {
            // Create JWT
            const token = createToken(userResult);
            res.cookie("token", token, { httpOnly: true });
            
            if (userResult.role == 'teacher') {
                return res.redirect('/manageCourses');
            } else {
                return res.redirect('/');
            }
        } else {
            // Authentication failed, render sign-in page with error message
            res.render('signIn', { error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error checking user:', error);
        res.status(500).send('Internal Server Error');
    }
};
