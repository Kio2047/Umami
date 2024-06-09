import * as dotenv from "dotenv";
import { z } from "zod";
import { pino } from "pino";

dotenv.config({ path: "./.env" });

// Add / remove environment variables to this schema
const envSchema = z.object({
  NODE_ENV: z.enum(["production", "development"]),
  DB_URI: z.string().min(1),
  DB_USER_USERNAME: z.string().min(1),
  DB_USER_PASSWORD: z.string().min(1),
  DB_NAME: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
  PORT: z.coerce
    .number()
    .optional()
    .refine((val) => val === undefined || !isNaN(val))
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const logger = pino();
  logger.fatal("Invalid environment variables", parsedEnv.error.format());
  process.exit(1);
}

export const envVars: z.infer<typeof envSchema> = parsedEnv.data;
