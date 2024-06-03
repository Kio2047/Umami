import * as dotenv from "dotenv";

import app from "./server";
import { connectDBClient } from "./Models";
import logger from "./utils/logger";

dotenv.config({ path: "./.env" });

(async () => {
  try {
    const port = process.env.PORT || 3001;
    await connectDBClient();
    app.listen(port, () => {
      logger.info(`Server running on ${port}`);
    });
  } catch (err) {
    logger.error(err);
  }
})();
