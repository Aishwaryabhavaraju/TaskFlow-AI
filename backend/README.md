# TaskFlow AI - Backend

The backend of **TaskFlow AI** is built using **Node.js**, **Express.js**, and **MongoDB**. It provides secure REST APIs for authentication, project management, team collaboration, AI-powered features, analytics, notifications, and file uploads.

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* Multer
* Cloudinary
* OpenAI API
* Joi
* Helmet
* CORS
* Compression
* Morgan

---

## Features

### Authentication

* Register
* Login
* JWT Authentication
* Password Hashing
* Forgot Password
* Reset Password

### Users

* User Profile
* Update Profile
* Profile Picture Upload

### Teams

* Create Team
* Join Team
* Invite Members
* Remove Members

### Projects

* Create Project
* Update Project
* Delete Project
* Team Collaboration

### Boards

* Default Kanban Board
* Custom Columns
* Column Ordering

### Tasks

* CRUD Operations
* Assign Members
* Labels
* Priorities
* Due Dates
* Move Tasks
* Complete Tasks

### Checklists

* Add Checklist Items
* Update Checklist Items
* Toggle Completion
* Delete Checklist Items

### Comments

* Create Comments
* Edit Comments
* Delete Comments
* User Mentions

### Notifications

* Task Assignment
* Team Invitations
* Mentions
* Task Completion
* Task Movement

### File Uploads

* Cloudinary Integration
* Task Attachments
* Profile Pictures

### Dashboard

* Overview
* Recent Tasks
* Upcoming Deadlines
* Project Progress
* Task Summary

### Analytics

* Task Status
* Priority Distribution
* Monthly Activity
* Project Progress
* Top Contributors

### AI

* Task Description Generator
* Project Summary
* Priority Suggestions
* Time Estimation
* Weekly Reports
* AI Assistant

---

## Project Structure

```text
backend/
│
├── src/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── modules/
│   │   ├── ai/
│   │   ├── analytics/
│   │   ├── attachment/
│   │   ├── auth/
│   │   ├── board/
│   │   ├── comment/
│   │   ├── dashboard/
│   │   ├── notification/
│   │   ├── project/
│   │   ├── task/
│   │   ├── team/
│   │   └── user/
│   ├── utils/
│   └── app.js
│
├── server.js
├── package.json
├── .env.example
└── README.md
```

---

## Installation

Install dependencies

```bash
npm install
```

Create a `.env` file using `.env.example`.

Run the development server

```bash
npm run dev
```

The API runs at:

```text
http://localhost:5000
```

---

## Environment Variables

* PORT
* NODE_ENV
* MONGO_URI
* JWT_SECRET
* JWT_EXPIRE
* EMAIL_HOST
* EMAIL_PORT
* EMAIL_USER
* EMAIL_PASS
* CLIENT_URL
* CLOUDINARY_CLOUD_NAME
* CLOUDINARY_API_KEY
* CLOUDINARY_API_SECRET
* OPENAI_API_KEY

---

## API Base URL

```text
http://localhost:5000/api/v1
```

### Available Modules

* `/auth`
* `/users`
* `/teams`
* `/projects`
* `/boards`
* `/tasks`
* `/comments`
* `/notifications`
* `/attachments`
* `/dashboard`
* `/analytics`
* `/ai`

---

## Security

* JWT Authentication
* Password Hashing
* Request Validation
* Global Error Handling
* CORS
* Helmet
* Compression
* Soft Deletes

---

## Status

Backend development is complete and ready for frontend integration.
