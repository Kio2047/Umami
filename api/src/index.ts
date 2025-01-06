import app from "./server";
import { connectDBClient } from "./Models";
import logger from "./utils/logger";
import envVars from "./envConfig";

(async () => {
  try {
    const port = envVars.PORT || 3001;
    await connectDBClient();
    app.listen(port, () => {
      logger.info(`Server running on ${port}`);
    });
  } catch (err) {
    logger.error(err);
  }
})();
