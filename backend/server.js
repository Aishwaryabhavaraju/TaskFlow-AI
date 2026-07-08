require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/database");
const logger = require("./src/utils/logger");
const http = require("http");
const { initSocket } = require("./src/socket");

const PORT = process.env.PORT || 5000;

connectDB();

const server = http.createServer(app);
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
initSocket(server);

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
