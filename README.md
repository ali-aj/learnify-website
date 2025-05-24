# Learnify 🎓

A modern Learning Management System empowering learners and educators through accessible and interactive online education.

## 🌟 Overview

Learnify is a comprehensive web-based learning platform built with Node.js, Express, and MySQL. It bridges the gap between students and teachers through robust course management, user authentication, and interactive learning tools.

## ✨ Key Features

- 🔐 Secure User Authentication
- 👥 Role-based Access (Student/Teacher)
- 📚 Course Management
- 📊 Interactive Dashboard
- 🔄 Password Recovery
- 📱 Responsive Design
- 📧 Email Notifications

## 🛠️ Tech Stack

### Frontend
- EJS Templates
- Bootstrap 5
- HTML/CSS
- jQuery

### Backend
- Node.js
- Express.js
- MySQL
- Bcrypt.js
- Nodemailer

## 📋 Requirements

- Node.js v14+
- MySQL Server
- npm

## 🚀 Getting Started

1. **Clone Repository**
   ```bash
   git clone https://github.com/ali-aj/learnify-website.git
   ```

2. **Install Dependencies**
   ```bash
   cd learnify-website
   npm install
   ```

3. **Database Setup**
   - Download [MySQL Installer](https://cdn.mysql.com//Downloads/MySQLInstaller/mysql-installer-community-8.0.42.0.msi)
   - Execute SQL Setup:
     ```sql
     CREATE DATABASE learnify;
     USE learnify;
     
     CREATE TABLE users (
         id INT AUTO_INCREMENT PRIMARY KEY,
         username VARCHAR(255) NOT NULL UNIQUE,
         email VARCHAR(255) NOT NULL UNIQUE,
         password VARCHAR(255) NOT NULL,
         role VARCHAR(50) NOT NULL,
         first_name VARCHAR(255) NOT NULL,
         last_name VARCHAR(255),
         date_of_birth DATE,
         phone_number VARCHAR(20),
         address TEXT,
         otp VARCHAR(6),
         profile_image LONGBLOB,
         facebook VARCHAR(255),
         twitter VARCHAR(255),
         linkedin VARCHAR(255),
         instagram VARCHAR(255),
         dribble VARCHAR(255),
         pinterest VARCHAR(255)
     );
     ```

4. **Environment Setup**
   - Create `.env` file:
     ```
     PORT=
     email=
     emailPassword=
     stripeSecretKey=
     jwtSecret=
     sqlHost=
     sqlUser=
     sqlPassword=
     sqlDatabase=
     ```

5. **Launch Application**
   ```bash
   node index.js
   ```

## 🎯 Usage Guide

1. Visit http://localhost:3000
2. Register as student/teacher
3. Login with credentials
4. Start learning!

## 🗺️ Routes

| Path | Description |
|------|-------------|
| / | Home page |
| /SignIn | Login |
| /SignUp | Registration |
| /ForgetPassword | Reset password |
| /logout | Sign out |
