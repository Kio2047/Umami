import * as dotenv from "dotenv";
import { z } from "zod";

import seederLogger from "./logger";

dotenv.config({ path: "./.env" });

const envSchema = z.object({
  DB_URI: z.string().min(1),
  // DB_USER_USERNAME: z.string().min(1),
  // DB_USER_PASSWORD: z.string().min(1),
  DB_NAME: z.string().min(1)
  // DB_PORT: z.coerce
  //   .number()
  //   .optional()
  //   .refine((val) => val === undefined || !isNaN(val))
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  seederLogger.fatal("Invalid environment variables", parsedEnv.error.format());
  process.exit(1);
}

export const seederEnvVars: z.infer<typeof envSchema> = parsedEnv.data;
