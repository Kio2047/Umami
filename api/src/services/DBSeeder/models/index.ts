import mongoose from "mongoose";

import seederlogger from "../logger";
import { seederEnvVars } from "../envConfig";

mongoose.connection.on("connected", function () {
  seederlogger.info(`Successfully connected to DB ${seederEnvVars.DB_NAME}`);
});

export const connectDBClient = async function () {
  await mongoose.connect(seederEnvVars.DB_URI, {
    dbName: seederEnvVars.DB_NAME
    // user: seederEnvVars.DB_USER_USERNAME,
    // pass: seederEnvVars.DB_USER_PASSWORD
  });
};

export { mongoose };
