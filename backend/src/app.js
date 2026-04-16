const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/auth");
const shiftRoutes = require("./routes/shifts");
const mduRoutes = require("./routes/mdu");
const adminRoutes = require("./routes/admin");
const uploadRoutes = require("./routes/uploads");

const app = express();

app.use(helmet());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://samruddhi-frontend.onrender.com"
  ],
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/shifts", shiftRoutes);
app.use("/api/mdu", mduRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/uploads", uploadRoutes);

module.exports = app;