import * as dotenv from "dotenv";
import { z } from "zod";
import { pino } from "pino";

import { envSchema } from "./types/schemas";

dotenv.config({ path: "./.env" });

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const logger = pino();
  logger.fatal("Invalid environment variables", parsedEnv.error.format());
  process.exit(1);
}

const envVars: z.infer<typeof envSchema> = parsedEnv.data;
export default envVars;
