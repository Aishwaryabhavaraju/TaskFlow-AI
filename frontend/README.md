# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# TaskFlow AI - Frontend

The frontend of **TaskFlow AI** is built with **React**, **Vite**, and **Tailwind CSS**. It provides a modern, responsive interface for project management, task collaboration, analytics, and AI-powered productivity.

---

## Tech Stack

* React
* Vite
* Tailwind CSS
* React Router
* Axios
* React Hook Form
* Context API / Redux Toolkit
* React Icons
* React Hot Toast
* Chart.js / Recharts

---

## Planned Features

### Authentication

* Login
* Register
* Forgot Password
* Reset Password

### Dashboard

* Overview Cards
* Recent Tasks
* Upcoming Deadlines
* Analytics Charts

### Teams

* Team List
* Team Details
* Invite Members

### Projects

* Project List
* Create Project
* Update Project
* Delete Project

### Boards

* Kanban Board
* Custom Columns
* Drag and Drop (planned)

### Tasks

* Create Task
* Edit Task
* Delete Task
* Labels
* Priorities
* Due Dates
* Assign Members
* Checklists
* Attachments

### Comments

* Task Discussions
* Mentions

### Notifications

* Notification Center
* Mark as Read

### AI

* Generate Task Description
* AI Project Summary
* Priority Suggestions
* Time Estimation
* Weekly Reports

### Analytics

* Task Status Charts
* Priority Charts
* Monthly Activity
* Project Progress

---

## Project Structure

```text
frontend/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md
```

---

## Installation

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

The application runs at:

```text
http://localhost:5173
```

---

## Backend Connection

Default backend URL:

```text
http://localhost:5000/api/v1
```

Configure the API URL in your environment file if needed.

---

## Planned Pages

* Login
* Register
* Forgot Password
* Dashboard
* Teams
* Projects
* Board
* Tasks
* Notifications
* Analytics
* AI Assistant
* User Profile
* Settings

---

## Planned Components

* Navbar
* Sidebar
* Dashboard Cards
* Task Card
* Kanban Column
* Project Card
* Team Card
* Notification Dropdown
* AI Assistant Panel
* Analytics Charts
* File Upload Component
* Comment Section

---

## Status

Frontend development will consume the backend REST APIs and provide a responsive, modern user experience for collaborative project management.
