const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

var session = require('express-session')

app.use(
  session({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/SignIn');
    }
  });
});

// Set views directory and template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Import controllers
const signInController = require('./controllers/signInController');
const signUpController = require('./controllers/signUpController');
const forgetPasswordController = require('./controllers/forgetPasswordController');
const landingPageController = require('./controllers/landingPageController');
const coursesController = require('./controllers/coursesController');
const myLearningController = require('./controllers/myLearningController');
const manageCoursesController = require('./controllers/manageCoursesController');
const getPaidController = require('./controllers/getPaidController');

// Use body parser for form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(express.json());

// Route handlers using controllers
app.get('/SignIn', signInController.signInPage);
app.post('/SignIn', signInController.signIn);

app.get('/SignUp', signUpController.signUpPage);
app.post('/SignUp', signUpController.signUp);

app.get('/ForgetPassword', forgetPasswordController.forgetPasswordPage);
app.post('/ForgetPassword/ChangePassword', forgetPasswordController.changePassword);

app.get('/', landingPageController.landingPage);

// Student Requests
app.get('/courses', coursesController.coursesPage);
app.get('/my-learnings', myLearningController.mylearningPage);


// Teacher Requests
app.get('/manageCourses', manageCoursesController.manageCoursesPage);
app.get('/get-paid', getPaidController.getPaidPage);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});