import { LoggerOptions, pino } from "pino";

const options: LoggerOptions = {
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
      ignore: "pid,hostname"
    }
  }
};

const seederLogger = pino(options);

export default seederLogger;
