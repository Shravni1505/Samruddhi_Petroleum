const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

const logDir = path.join(__dirname, "../logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const accessLogStream = fs.createWriteStream(
  path.join(logDir, "access.log"),
  { flags: "a" }
);

// 👇 IMPORTANT: export middleware directly
module.exports = morgan("combined", {
  stream: accessLogStream,
});