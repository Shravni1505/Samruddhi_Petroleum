//Node Module Loader: checks node_modules, resolves file paths, loads dependencies into memory
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./utils/logger");
const { ensureAdminUser } = require("./utils/seedAdmin");

const authRoutes = require("./routes/auth");
const shiftRoutes = require("./routes/shifts");
const mduRoutes = require("./routes/mdu");
const adminRoutes = require("./routes/admin");
const uploadRoutes = require("./routes/uploads");

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200
};

//Creates: HTTP server object, middleware pipeline
const app = express();

//Request → middleware1 → middleware2 → route → response
app.use(helmet());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://samruddhi-frontend.onrender.com"
  ],
  credentials: true
}));
app.use(express.json({ limit: "10mb" }));
const morganLogger = require("./utils/morganLogger");
//console.log("Morgan Logger:", morganLogger);
app.use(morganLogger);
//app.use(morgan("dev")); // optional: keep console logs too

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/shifts", shiftRoutes);
app.use("/api/mdu", mduRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/uploads", uploadRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({ message: err.message || "Internal server error" });
});

const app = require("./app");
//const logger = require("./utils/logger");
const { ensureAdminUser } = require("./utils/seedAdmin");

const port = process.env.PORT || 4000;

app.listen(port, async () => {
  try {
    await ensureAdminUser();
    logger.info(`API running on port ${port}`);
  } catch (error) {
    logger.error("Failed to seed admin user: " + error.message);
  }
});

module.exports = app;