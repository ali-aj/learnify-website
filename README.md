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
- MongoDB
- Bcrypt.js
- Nodemailer

## 📋 Requirements

- Node.js 
- MySQL Server
- MongoDB Atlas
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
   
   **MySQL Server Setup:**
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

     CREATE TABLE courseenrollmentdetails (
         course_code VARCHAR(255) NOT NULL,
         student_username VARCHAR(255) NOT NULL,
         enroll_date DATETIME NOT NULL,
         enroll_price DECIMAL(10, 2) NOT NULL,
         status VARCHAR(50) NOT NULL,
         progress INT DEFAULT 0,
         completion_date DATETIME,
         PRIMARY KEY (course_code, student_username)
     );
     ```
   **MongoDB Atlas Setup:**
   - Create account on [MongoDB Atlas](https://cloud.mongodb.com/)
   - Create new project named "Learnify"
   - Build a new cluster (free tier available)
   - Set up database access (create username/password)
   - Configure network access (add your IP or allow all IPs)
   - Create database named "Learnify"
   - **Create these collections:**
      1. course_categories (for storing course categories)
      2. courses (for storing course details)
   - Get your connection string from "Connect" button
   - Replace `<password>` in connection string with your database user password

4. **Environment Setup**
   - Create `.env` file in project root:
      ```env
      # Server Configuration
      PORT=3000                    # Application port (default: 3000)
      
      # Email Configuration
      EMAIL=your@email.com         # SMTP sender email
      EMAIL_PASSWORD=yourpassword  # App-specific password for 2FA or regular password
      
      # Security
      JWT_SECRET=your-secret-key   # JWT token encryption key
      
      # Payment (Optional)
      STRIPE_SECRET_KEY=sk_test_   # Stripe API secret key
      
      # Database Configuration
      SQL_HOST=localhost          # MySQL server host
      SQL_USER=root               # MySQL username
      SQL_PASSWORD=yourpassword   # MySQL user password
      SQL_DATABASE=learnify       # Database name
      MONGO_URL=connection_string # Mongo DB Connection String
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