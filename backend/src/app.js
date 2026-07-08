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

// Enable CORS first (before helmet to prevent header conflicts)
const allowedOrigins = [
  "https://task-flow-ai-yww3.vercel.app",
  "https://task-flow-ai-yww3-git-main-baak.vercel.app",
  "https://task-flow-ai-yww3-*.vercel.app",
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://[::1]:5173",
].filter(Boolean);

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin matches any allowed origin (with wildcard support)
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin.includes("*")) {
        const pattern = allowedOrigin.replace(/\*/g, ".*");
        return new RegExp(pattern).test(origin);
      }
      return allowedOrigin === origin;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`CORS rejected origin: ${origin}`);
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["X-Total-Count", "X-Page-Number"],
  maxAge: 3600,
  preflightContinue: false,
};

app.use(cors(corsOptions));

// Add explicit CORS headers as fallback
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  if (origin) {
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin.includes("*")) {
        const pattern = allowedOrigin.replace(/\*/g, ".*");
        return new RegExp(pattern).test(origin);
      }
      return allowedOrigin === origin;
    });
    
    if (isAllowed) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
    }
  }
  
  next();
});

// Handle preflight requests explicitly
app.options("*", cors(corsOptions));

// Security
app.use(helmet({
  crossOriginResourcePolicy: false,
  contentSecurityPolicy: false,
}));

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