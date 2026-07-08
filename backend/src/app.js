const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const authRoutes = require("./modules/auth/auth.routes");
const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./modules/user/user.routes");
const teamRoutes = require("./modules/team/team.routes");
const projectRoutes = require("./modules/project/project.routes");
const boardRoutes = require("./modules/board/board.routes");
const taskRoutes = require("./modules/task/task.routes");
const commentRoutes = require("./modules/comment/comment.routes");
const notificationRoutes = require("./modules/notification/notification.routes");
const attachmentRoutes = require("./modules/attachment/attachment.routes");
const dashboardRoutes = require("./modules/dashboard/dashboard.routes");
const aiRoutes = require("./modules/ai/ai.routes");
const analyticsRoutes = require("./modules/analytics/analytics.routes");
const calendarRoutes = require("./modules/calendar/calendar.routes");

const app = express();

// Security
app.use(helmet());

// Enable CORS
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://[::1]:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(
          `CORS policy does not allow access from origin ${origin}`
        )
      );
    },
    credentials: true,
  })
);

// Parse JSON
app.use(express.json());

// Parse Form Data
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// Compression
app.use(compression());

// Logging
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/teams", teamRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/boards", boardRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/attachments", attachmentRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/calendar", calendarRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TaskFlow AI Backend Running Successfully 🚀",
  });
});


// 404 Route
app.use((req, res) => {

  res.status(404).json({

    success: false,

    message: "Route not found",

  });

});

// Error Middleware
app.use(errorHandler);

module.exports = app;