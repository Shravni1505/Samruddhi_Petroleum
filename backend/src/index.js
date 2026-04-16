require("dotenv").config();

const app = require("./app");
const logger = require("./utils/logger");
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