
# 🚀 TaskFlow AI

### Plan Smarter. Build Faster. Ship More.

TaskFlow AI is a full-stack, AI-powered collaborative project management platform built using the MERN stack. It helps individuals and teams transform ideas into organized, actionable work through intelligent task planning, Kanban boards, project analytics, and AI-assisted productivity tools.

From creating your first project to tracking team progress, TaskFlow AI brings planning, execution, and collaboration into one modern workspace.

> **Your ideas deserve more than a to-do list. Turn them into successful products with TaskFlow AI.**

---

## 🌟 Why TaskFlow AI?

Managing a project often involves scattered tasks, unclear priorities, missed deadlines, and disconnected team communication.

TaskFlow AI brings these workflows together in one platform.

### With TaskFlow AI, you can:

- Organize projects and manage tasks in one workspace.
- Use AI to assist with task creation and project planning.
- Prioritize work based on importance and deadlines.
- Collaborate with team members.
- Track project progress through dashboards and analytics.
- Manage task attachments and notifications.
- Understand project performance through actionable insights.

Whether you are building a personal project, managing a college team, or working on a product, TaskFlow AI helps turn ideas into structured execution.

---

## ✨ Key Features

### 🔐 Authentication & Security

- User registration and login.
- JWT-based authentication.
- Password hashing using bcrypt.
- Forgot password and reset password.
- Protected routes.
- Role-based authorization.
- Secure environment variable management.
- Request validation and centralized error handling.

### 👤 User Management

- View and update user profiles.
- Upload profile pictures.
- Cloudinary image storage.
- Manage personal account information.

### 👥 Team Management

- Create and manage teams.
- Invite members.
- Join teams.
- Remove team members.
- Manage team participation and collaboration.

### 📁 Project Management

- Create, update, and delete projects.
- Soft-delete support for projects.
- Project ownership and collaboration.
- Assign team members to projects.
- Organize work across multiple projects.

### 📋 Kanban Boards

- Automatic default board creation.
- Create custom boards.
- Add, update, and delete columns.
- Customize column colors.
- Manage column ordering.
- Organize tasks visually using Kanban workflows.

### ✅ Task Management

- Create, update, and delete tasks.
- Assign tasks to team members.
- Add labels and priorities.
- Set due dates.
- Move tasks between columns.
- Track task status.
- Mark tasks as completed.

### ☑️ Checklist Management

- Add checklist items to tasks.
- Update checklist items.
- Toggle completion status.
- Delete checklist items.
- Break complex tasks into smaller actionable steps.

### 💬 Comments & Collaboration

- Add comments to tasks.
- Edit and delete comments.
- Mention users.
- Support collaborative task discussions.

### 🔔 Notifications

- Task assignment notifications.
- Task completion notifications.
- Task movement notifications.
- Team invitation notifications.
- User mention notifications.
- Project-related notifications.
- Mark notifications as read.

### 📎 File Management

- Upload task attachments.
- Store files using Cloudinary.
- Support multiple file types.
- Store file metadata.
- Soft-delete attachment records.

### 📊 Dashboard

- Dashboard overview.
- Recent tasks.
- Upcoming deadlines.
- Project progress tracking.
- Task status summaries.
- Productivity insights.
- Recent activity.

### 📈 Analytics

- Task status analytics.
- Priority distribution.
- Monthly activity.
- Project progress analytics.
- Team productivity insights.
- Dashboard analytics.
- Top contributors.

### 🤖 AI-Powered Productivity

TaskFlow AI integrates AI features to help users plan and execute work more efficiently.

- AI Assistant.
- Generate task descriptions.
- Project summarization.
- Priority suggestions.
- Task time estimation.
- Improve comments.
- Weekly project reports.

> AI features are designed to assist users with planning and productivity. Users remain in control of their tasks and project decisions.

---

## 🛠 Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| React.js | User interface |
| Vite | Frontend build tool |
| Tailwind CSS | Styling |
| Redux | State management |
| React Router | Client-side routing |
| Axios | API communication |
| FullCalendar | Calendar functionality |
| Socket.IO Client | Real-time communication |
| React Hot Toast | Notifications |

### Backend

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Backend framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Joi | Request validation |
| Helmet | Security headers |
| CORS | Cross-origin configuration |
| Compression | Response compression |
| Morgan | HTTP request logging |
| Dotenv | Environment configuration |

### File Storage & AI

| Technology | Purpose |
|------------|---------|
| Multer | File upload handling |
| Cloudinary | Cloud file storage |
| OpenAI API | AI-powered features |

---

## 🏗️ System Architecture

TaskFlow AI follows a modular backend architecture and RESTful API principles.

```text
                         ┌─────────────────────┐
                         │      Frontend       │
                         │   React + Vite      │
                         │   Tailwind CSS      │
                         └──────────┬──────────┘
                                    │
                              REST API / JWT
                                    │
                         ┌──────────▼──────────┐
                         │       Backend       │
                         │   Node.js + Express │
                         └──────────┬──────────┘
                                    │
               ┌────────────────────┼────────────────────┐
               │                    │                    │
       ┌───────▼───────┐    ┌───────▼───────┐    ┌───────▼───────┐
       │   Auth & User  │    │ Project & Task│    │   AI Module   │
       │    Modules     │    │    Modules    │    │               │
       └───────┬───────┘    └───────┬───────┘    └───────┬───────┘
               │                    │                    │
               └────────────────────┼────────────────────┘
                                    │
                         ┌──────────▼──────────┐
                         │      MongoDB        │
                         │    Data Storage     │
                         └─────────────────────┘

             Cloudinary → Profile Pictures & Attachments
             OpenAI API  → AI Productivity Features
```

---

## 📁 Project Structure

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
│   │   │   ├── user/
│   │   │   └── workspace/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── app.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── index.html
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Getting Started

Follow the steps below to run TaskFlow AI locally.

### Prerequisites

Make sure you have installed:

- Node.js and npm.
- MongoDB Atlas or a local MongoDB instance.
- Git.
- An OpenAI API key for AI features.
- A Cloudinary account for image and file uploads.
- Email credentials if email functionality is enabled.

---

## 📥 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Aishwaryabhavaraju/TaskFlow-AI.git
```

```bash
cd TaskFlow-AI
```

---

### 2. Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder.

```env
PORT=5000
NODE_ENV=development

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:5173

EMAIL_USER=your_email
EMAIL_PASS=your_email_password

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

OPENAI_API_KEY=your_openai_api_key
```

Start the backend server:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

---

### 3. Frontend Setup

Open a new terminal from the project root:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_SOCKET_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## 🔌 API Modules

| Module | Base Endpoint |
|--------|---------------|
| Authentication | `/api/v1/auth` |
| Users | `/api/v1/users` |
| Teams | `/api/v1/teams` |
| Projects | `/api/v1/projects` |
| Boards | `/api/v1/boards` |
| Tasks | `/api/v1/tasks` |
| Comments | `/api/v1/comments` |
| Notifications | `/api/v1/notifications` |
| Attachments | `/api/v1/attachments` |
| Dashboard | `/api/v1/dashboard` |
| Analytics | `/api/v1/analytics` |
| AI | `/api/v1/ai` |

---

## 🔒 Security

TaskFlow AI includes security-focused backend practices:

- JWT authentication.
- Password hashing with bcrypt.
- Protected routes.
- Role-based authorization.
- Environment variable protection.
- Helmet security headers.
- CORS configuration.
- Joi request validation.
- Centralized error handling.
- Soft-delete implementation.

### Security Best Practices

- Never commit `.env` files.
- Never expose API keys in frontend code.
- Never expose users' private API keys to other users.
- Keep secrets in environment variables.
- Validate ownership before returning private resources.
- Use HTTPS in production.
- Rotate credentials if they are exposed.

---

## 🧪 Development Workflow

1. Plan the feature and architecture.
2. Build backend REST APIs.
3. Integrate MongoDB.
4. Develop frontend components.
5. Connect frontend and backend.
6. Add AI-powered productivity features.
7. Test and debug.
8. Improve security and performance.
9. Deploy the application.

---

## 🚀 Future Enhancements

The following features are planned or under consideration:

- Real-time collaboration using Socket.IO.
- Drag-and-drop Kanban improvements.
- Calendar enhancements.
- Email notifications.
- Mobile application.
- Dark mode improvements.
- Workspace management.
- Activity timeline.
- Team chat.
- OAuth login with Google/GitHub.
- Docker support.
- CI/CD pipeline.
- Unit and integration testing.
- Production deployment improvements.

---

## 🤝 Contributing

Contributions are welcome!

### Steps to Contribute

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Commit your changes.

```bash
git add .
git commit -m "Add your feature"
```

5. Push the branch.

```bash
git push origin feature/your-feature
```

6. Open a Pull Request.

---

## 👩‍💻 Author

### Aishwarya Anandakamala

Full Stack Developer | AI Enthusiast

TaskFlow AI is a full-stack capstone project demonstrating modern web development practices, modular backend architecture, RESTful API design, AI integration, and collaborative productivity workflows.

---

## ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub.

**Built with React, Node.js, MongoDB, and AI.**

### TaskFlow AI — Plan Smarter. Build Faster. Ship More.