import mongoose from "mongoose";

import logger from "../utils/logger";
import envVars from "../envConfig";

mongoose.connection.on("connected", function () {
  logger.info(`Successfully connected to DB ${envVars.DB_NAME}`);
});

export const connectDBClient = async function () {
  await mongoose.connect(envVars.DB_URI, {
    dbName: envVars.DB_NAME
    // user: envVars.DB_USER_USERNAME,
    // pass: envVars.DB_USER_PASSWORD
  });
};

export { mongoose };
