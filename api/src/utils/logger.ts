import envVars from "../envConfig";
import { LoggerOptions, pino } from "pino";

const options: LoggerOptions =
  envVars.NODE_ENV === "production"
    ? {}
    : {
        transport: {
          target: "pino-pretty",
          options: {
            translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
            ignore: "pid,hostname"
          }
        }
      };

const logger = pino(options);

export default logger;
