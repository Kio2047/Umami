import { z } from "zod";

export const registerUserSchemas = {
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string"
      })
      .email({ message: "Invalid email provided" }),
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string"
      })
      .regex(/[a-z]+/i, "Name must contain at least one letter")
      .refine((val) => !/\s{2,}/.test(val), {
        message:
          "Name must not contain more than one whitespace character in a row"
      }),
    username: z
      .string({
        required_error: "Username is required",
        invalid_type_error: "Username must be a string"
      })
      .min(1, "Username must be at least 1 character long")
      .max(20, "Username must be at most 20 characters long")
      .regex(
        /^[A-Za-z0-9_]+$/,
        "Username must only contain letters, numbers, and underscores"
      ),
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

export const updateReplaceSchema = z.object({
  op: z.literal("replace"),
  path: z.enum(["/email", "/password", "/name", "/username", "/profileImage"], {
    required_error: "path is required",
    invalid_type_error: "invalid op / path combination"
  }),
  value: z.string({
    required_error: "value is required",
    invalid_type_error: "value must be a string"
  })
});

const updateAddSchema = z.object({
  op: z.literal("add"),
  path: z.enum(["/following", "/followers"], {
    required_error: "path is required",
    invalid_type_error: "invalid op / path combination"
  }),
  value: z.string({
    required_error: "value is required",
    invalid_type_error: "value must be a string"
  })
});

export const updateUserSchemas = {
  body: z.discriminatedUnion("op", [updateReplaceSchema, updateAddSchema], {
    required_error: "op is required",
    invalid_type_error: "op must be a valid action"
  })
};

// export const updateUserValidations = [
//   body("path")

//   oneOf([
//     body("value").if(pathIsEmail).isEmail().normalizeEmail(),
//     body("value").if(pathIsFollowing).isString().custom(isValidObjectID),
//     body("value")
//       .if(pathIsprofileImageURL)
//       .custom(isValidCloudinaryImageURL("user_profile_images"))
//   ])
// ];

// const pathIsEmail: CustomValidator = (value, { req }) => {
//   return req.body.path === "/email";
// };
// const pathIsPassword: CustomValidator = (value, { req }) => {
//   return req.body.path === "/password";
// };
// const pathIsName: CustomValidator = (value, { req }) => {
//   return req.body.path === "/name";
// };
// const pathIsUsername: CustomValidator = (value, { req }) => {
//   return req.body.path === "/username";
// };
// const pathIsprofileImageURL: CustomValidator = (value, { req }) => {
//   return req.body.path === "/profileImageURL";
// };
// const pathIsFollowing: CustomValidator = (value, { req }) => {
//   return req.body.path === "/following";
// };
// const followIdIsNotOwn: CustomValidator = (value, { req }) => {
//   return;
// };

// //TODO: add validations to ensure request fields which aren't part of the user document cannot be added to the url
// // const getUserValidations;

// // const isValidCloudinaryImageURL = (
// //   requiredFolder: "user_profile_images" | "user_post_images"
// // ) => {
// //   // TODO: add check to see if the image actually exists in Cloudinary
// //   return (url: string) => {
// //     const expressionToMatch = new RegExp(
// //       `^https://res.cloudinary.com/di3penpbh/image/upload/v[\d]+/${requiredFolder}/`
// //     );
// //     if (expressionToMatch.test(url)) return true;
// //     else throw new Error("invalid Cloudinary image URL");
// //   };
// // };
