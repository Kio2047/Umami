import app from "./server";
import logger from "./utils/logger";
import envVars from "./envConfig";
import { connectDBClient } from "./Models";

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
