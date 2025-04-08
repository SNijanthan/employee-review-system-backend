# Employee Review System - Backend

## 📌 Project Overview

The **Employee Review System** is a role-based feedback management application built using the **MERN stack**. It allows organizations to manage employees, assign performance reviews, and collect peer feedback — all within a secure and structured system.

## 🛠️ Tech Stack

- **Runtime:** `Node.js`
- **Framework:** `Express.js`
- **Database:** `MongoDB`

## 📦 Dependencies

### 🔹 Core Libraries:

- `express` → Web framework for Node.js
- `mongoose` → ODM for MongoDB
- `jsonwebtoken` (JWT) → Handles authentication
- `validator` → For data validation on both DB level and API level
- `bcrypt` → Hashes passwords securely
- `cors` → Handles cross-origin requests
- `dotenv` → Manages environment variables
- `cookie-parser` → Parses cookies

### 🔹 Development Dependencies:

- `nodemon` → Auto-restarting server for development

## API Structures:

### Auth Router

- `POST /signup` → Registers a new user
- `POST /login` → User login
- `POST /logout` → Logs out a user

### User Router

- `PATCH /users/:id/promote` - Promote to admin
- `GET /users` - Get all users
- `GET /users/:id` - Get a single user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Review Router

- `POST /reviews` → Creates new Review
- `PUT /reviews/:id` → Update review
- `GET /reviews` → Get all review
- `GET /reviews/:id` → Get single review
- `PATCH reviews/:id/assign` → Assign for feedback

### Feedback Routee

- `PUT /feedback/:reviewId` → Submit feedback
- `GET /feedback/assigned` → View assigned feedbacks
