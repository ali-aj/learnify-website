const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
app.set('views' , path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(express.json());

app.get('/SignIn', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signIn.html'));
});

app.get('/SignUp', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signUp.html'));
});

app.get('/ForgetPassword', (req, res) => {
  res.render('forgetPassword', {email: '', user_exist: '', status: ''});
});

app.get('/', (req, res) => {
  res.redirect('/SignIn');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});