import { z } from "zod";

const baseUsernameOrEmail = z.string({
  required_error: "usernameOrEmail is required",
  invalid_type_error: "usernameOrEmail must be a string"
});

export const loginUserSchemas = {
  body: z.object({
    usernameOrEmail: z.union([
      baseUsernameOrEmail
        .min(1, "Username must be at least 1 character long")
        .max(20, "Username must be at most 20 characters long")
        .regex(
          /^[A-Za-z0-9_]+$/,
          "Username must only contain letters, numbers, and underscores"
        ),
      baseUsernameOrEmail.email({ message: "Invalid email provided" })
    ]),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string"
      })
      .min(7, "Password must be at least 7 characters long")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9\s]/,
        "Password must contain at least one special character"
      )
  })
};
