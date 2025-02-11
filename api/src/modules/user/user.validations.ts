import { z } from "zod";

// const generateCloudinaryUrlValidator = (
//   requiredFolder: "user_profile_images" | "user_post_images"
// ) => {
//   // TODO: add check to see if the image actually exists in Cloudinary
//   return (url: string) => {
//     const expressionToMatch = new RegExp(
//       `^https://res.cloudinary.com/di3penpbh/image/upload/v[\d]+/${requiredFolder}/`
//     );
//     if (!expressionToMatch.test(url)) return false;
//     return true;
//   };
// };
// const isValidProfileImageUrl = generateCloudinaryUrlValidator(
//   "user_profile_images"
// );

const emailSchema = z
  .string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string"
  })
  .email({ message: "Invalid email provided" });

const nameSchema = z
  .string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string"
  })
  .regex(/[a-z]+/i, "Name must contain at least one letter")
  .refine((val) => !/\s{2,}/.test(val), {
    message: "Name must not contain more than one whitespace character in a row"
  });

const usernameSchema = z
  .string({
    required_error: "Username is required",
    invalid_type_error: "Username must be a string"
  })
  .min(1, "Username must be at least 1 character long")
  .max(20, "Username must be at most 20 characters long")
  .regex(
    /^[A-Za-z0-9_]+$/,
    "Username must only contain letters, numbers, and underscores"
  );

const passwordSchema = z
  .string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string"
  })
  .min(7, "Password must be at least 7 characters long")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9\s]/,
    "Password must contain at least one special character"
  );

const profileImageUrlRegex = new RegExp(
  `^https://res.cloudinary.com/di3penpbh/image/upload/v[\d]+/user_profile_images/`
);
const profileImageSchema = z
  .string({
    required_error: "New image URL is required",
    invalid_type_error: "New image URL must be a string"
  })
  .regex(profileImageUrlRegex);

export const registerUserSchema = {
  body: z.object({
    email: emailSchema,
    name: nameSchema,
    username: usernameSchema,
    password: passwordSchema
  })
};

const updateEmailSchema = z.object({
  op: z.literal("replace"),
  path: z.literal("/email"),
  value: emailSchema
});

const updatePasswordSchema = z.object({
  op: z.literal("replace"),
  path: z.literal("/password"),
  value: passwordSchema
});

const updateNameSchema = z.object({
  op: z.literal("replace"),
  path: z.literal("/name"),
  value: nameSchema
});

const updateProfileImageSchema = z.object({
  op: z.literal("replace"),
  path: z.literal("/profileImage"),
  value: profileImageSchema
  // value: z
  //   .string({
  //     required_error: "New image URL is required",
  //     invalid_type_error: "New image URL must be a string"
  //   })
  //   .refine(isValidProfileImageUrl, {
  //     message: "Invalid profile image URL provided"
  //   })
});

const updateUsernameSchema = z.object({
  op: z.literal("replace"),
  path: z.literal("/username"),
  value: usernameSchema
});

const addFollowerSchema = z.object({
  op: z.literal("add"),
  path: z.literal("/followers"),
  value: z.string({
    required_error: "value is required",
    invalid_type_error: "value must be a string"
  })
});

export const updateUserSchemas = {
  body: z.union([
    updateEmailSchema,
    updatePasswordSchema,
    updateNameSchema,
    updateProfileImageSchema,
    updateUsernameSchema,
    addFollowerSchema
  ])
};
