import { z } from "zod";

// Add / remove environment variables to this schema
export const envSchema = z.object({
  NODE_ENV: z.enum(["production", "development"]),
  DB_URI: z.string().min(1),
  DB_NAME: z.string().min(1),
  // DB_USER_USERNAME: z.string().min(1),
  // DB_USER_PASSWORD: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
  PORT: z.coerce
    .number()
    .optional()
    .refine((val) => val === undefined || !isNaN(val))
});

export const responseSchema = z.object({
  status: z.number(),
  location: z.string().optional(),
  body: z.object({
    status: z.enum(["success", "error"]),
    message: z.string(),
    data: z.record(z.any()).optional()
  })
});
