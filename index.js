const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));
app.use(express.json());

app.get('/SignIn', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signIn.html'));
});

app.get('/SignUp', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signUp.html'));
});

app.get('/ForgetPassword', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'forgetPassword.html'));
});

app.get('/', (req, res) => {
  res.redirect('/SignIn');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});