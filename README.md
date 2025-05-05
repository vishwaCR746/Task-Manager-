# 📝 Task Manager App (MERN Stack)

A fully functional Task Management web application built with the **MERN** stack. It includes user authentication, password reset via email link (logged in console for development), and powerful CRUD operations for tasks. The interface is responsive, animated, and user-friendly.

---

## 🚀 Features

- ✅ User Registration & Login
- 🔐 JWT Authentication
- 🔄 Forgot & Reset Password (via email console)
- 📋 Create, View, Edit, Delete Tasks
- 📌 Pin / Unpin Tasks
- ✅ Mark Tasks as Done / Undo
- 🎨 Responsive UI with Tailwind CSS
- 🧠 Animations with Framer Motion
- 🔔 Notifications via React Hot Toast

---

## 🛠 Tech Stack

### **Frontend**:
- React + Vite
- Tailwind CSS
- React Router DOM
- Framer Motion
- React Icons
- React Hot Toast

### **Backend**:
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Bcrypt (password hashing)
- dotenv (environment variables)

---

## ⚙️ How to Run Locally

###  Clone the Repository

```bash
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app

📦 Backend Setup
cd backend
npm install

Create .env file in /backend folder:
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
Start the backend server:
npm start

💻 Frontend Setup
cd frontend
npm install
Start the frontend dev server:
npm run dev




```

📎 Usage
Register a new account.

Log in with your credentials.

Create new tasks, edit or delete them.

Pin important tasks or mark them as done.

Reset password using the link shown in the console (simulated email).
