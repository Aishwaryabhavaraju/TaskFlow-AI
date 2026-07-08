# TaskFlow AI

**TaskFlow AI** is a full-stack AI-powered collaborative project management platform built using the **MERN Stack**. It enables teams to efficiently manage projects, organize tasks using Kanban boards, collaborate in real time, upload files, receive notifications, analyze project performance, and leverage AI-powered productivity features.

The project is designed as a modern, scalable, and production-ready application following modular architecture and RESTful API principles.

---

# 🚀 Features

## 🔐 Authentication & Security

* User Registration
* User Login
* JWT Authentication
* Password Hashing using bcrypt
* Forgot Password
* Reset Password
* Protected Routes
* Role-based Authorization
* Secure Environment Variables

---

## 👤 User Management

* User Profile
* Update Profile
* Upload Profile Picture
* Cloudinary Image Storage

---

## 👥 Team Management

* Create Teams
* Join Teams
* Invite Members
* Remove Members
* Team Member Management

---

## 📁 Project Management

* Create Projects
* Update Projects
* Delete Projects (Soft Delete)
* Assign Team Members
* Project Ownership
* Project Collaboration

---

## 📋 Kanban Board

* Automatic Default Board Creation
* Custom Boards
* Create Columns
* Update Columns
* Delete Columns
* Custom Column Colors
* Column Ordering

---

## ✅ Task Management

* Create Tasks
* Update Tasks
* Delete Tasks
* Assign Members
* Labels
* Priorities
* Due Dates
* Move Tasks Between Columns
* Complete Tasks
* Task Status Tracking

---

## ✔ Checklist Management

* Add Checklist Items
* Update Checklist Items
* Toggle Completion
* Delete Checklist Items

---

## 💬 Comments

* Add Comments
* Edit Comments
* Delete Comments
* Mention Users

---

## 🔔 Notifications

* Task Assignment Notifications
* Task Completion Notifications
* Task Movement Notifications
* Team Invitation Notifications
* Mention Notifications
* Project Notifications
* Mark Notifications as Read

---

## 📎 File Uploads

* Upload Task Attachments
* Cloudinary Storage
* Multiple File Types
* File Metadata
* Soft Delete Attachments

---

## 📊 Dashboard APIs

* Dashboard Overview
* Recent Tasks
* Upcoming Deadlines
* Project Progress
* Task Status Summary

---

## 📈 Analytics

* Task Status Analytics
* Priority Distribution
* Monthly Activity
* Project Progress Analytics
* Team Productivity
* Dashboard Analytics
* Top Contributors

---

## 🤖 AI Features

* AI Assistant
* Generate Task Descriptions
* Project Summarization
* Priority Suggestions
* Time Estimation
* Improve Comments
* Weekly Project Reports

---

# 🛠 Tech Stack

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Frontend

* React.js
* Vite
* Tailwind CSS

## Authentication

* JWT (JSON Web Tokens)
* bcryptjs

## File Upload

* Multer
* Cloudinary
* Multer Storage Cloudinary

## AI

* OpenAI API

## Additional Libraries

* Joi
* Helmet
* CORS
* Compression
* Morgan
* Dotenv

---

# 📁 Project Structure

```text
TaskFlow-AI/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── modules/
│   │   │   ├── ai/
│   │   │   ├── analytics/
│   │   │   ├── attachment/
│   │   │   ├── auth/
│   │   │   ├── board/
│   │   │   ├── comment/
│   │   │   ├── dashboard/
│   │   │   ├── notification/
│   │   │   ├── project/
│   │   │   ├── task/
│   │   │   ├── team/
│   │   │   └── user/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── app.js
│   │
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│
├── frontend/
│
├── .gitignore
└── README.md
```

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/Aishwaryabhavaraju/TaskFlow-AI.git
```

```bash
cd TaskFlow-AI
```

---

## Backend Setup

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file in `backend` and add the following variables:

```env
PORT=5000

NODE_ENV=development

MONGO_URI=

JWT_SECRET=

JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:5173

EMAIL_USER=

EMAIL_PASS=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

OPENAI_API_KEY=
```

Copy the frontend example file to `frontend/.env` and update the API URL values if needed:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_SOCKET_URL=http://localhost:5000
```

Do not commit any `.env` files. Use the provided `backend/.env.example` and `frontend/.env.example` templates instead.

Start the development server

```bash
npm run dev
```

The backend will run at:

```
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run the React application

```bash
npm run dev
```

The frontend will run at:

```
http://localhost:5173
```

---

# 🔌 API Modules

| Module         | Base Endpoint           |
| -------------- | ----------------------- |
| Authentication | `/api/v1/auth`          |
| Users          | `/api/v1/users`         |
| Teams          | `/api/v1/teams`         |
| Projects       | `/api/v1/projects`      |
| Boards         | `/api/v1/boards`        |
| Tasks          | `/api/v1/tasks`         |
| Comments       | `/api/v1/comments`      |
| Notifications  | `/api/v1/notifications` |
| Attachments    | `/api/v1/attachments`   |
| Dashboard      | `/api/v1/dashboard`     |
| Analytics      | `/api/v1/analytics`     |
| AI             | `/api/v1/ai`            |

---

# 🔒 Security Features

* JWT Authentication
* Password Hashing
* Environment Variable Protection
* Secure HTTP Headers
* Request Validation
* CORS Configuration
* API Compression
* Global Error Handling
* Soft Delete Implementation

---

# 📊 Future Enhancements

* Real-time collaboration using Socket.IO
* Drag-and-drop Kanban board
* Calendar View
* Email Notifications
* Mobile Application
* Dark Mode
* Workspace Management
* Activity Timeline
* Team Chat
* OAuth Login (Google/GitHub)
* Docker Support
* CI/CD Pipeline
* Unit & Integration Testing
* Deployment on AWS/Vercel/Render

---

# 👨‍💻 Development Workflow

1. Plan features and architecture.
2. Build backend REST APIs.
3. Integrate MongoDB database.
4. Develop the React frontend.
5. Connect frontend with backend APIs.
6. Add AI-powered productivity features.
7. Optimize performance and security.
8. Deploy the application.

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---


# 👩‍💻 Author

**Aishwarya Anandakamala**

Built as a full-stack capstone project demonstrating modern web development practices with the MERN stack, AI integration, and scalable backend architecture.
