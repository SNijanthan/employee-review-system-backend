# Employee Review System - Frontend

## 📌 Project Overview

A **React-based frontend** for the **Employee Review System** that allows admins to manage employees and assign feedback tasks, while employees can submit and view feedback through a clean, role-based interface.

## 🛠️ Tech Stack

- **Library**: React.js
- **Styling**: Tailwind CSS, DaisyUI
- **State Management**: Redux
- **Routing**: React-Router-Dom

## 📦 Dependencies

### 🔹 Core Libraries:

- `react` → Core UI framework
- `react-router-dom` → Handles routing and protected routes
- `axios` → Manages API communication
- `daisyui` → UI components for styling

### 🔹 Development Dependencies:

- `vite` → Fast build tool for development

## 🚀 Features

- `Authentication` → Secure login with JWT-based session handling
- `Role-based Access` → Admins and employees see different views and controls
- `Employee Management` → Admins can create, edit, and delete employees
- `Review Assignment` → Admins can assign reviewers to specific employees
- `Feedback Submission` → Employees can submit feedback on assigned colleagues
- `Feedback Viewing` → Employees can view feedback they've received

## 🔗 API Integration

- Axios handles all backend communication
- JWT tokens are stored in HTTP-only cookies for security
- All data shown on the UI reflects real-time updates from the backend
