import { z } from "zod";
import { body, CustomValidator, oneOf } from "express-validator";
import { Types } from "mongoose";

const { ObjectId } = Types;

// TODO: pull all register form validations up to root level shared folder for SSOT

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

export const getFeedPostsSchemas = {
  query: z.object({
    lastCreatedAt: z
      .string()
      .datetime({
        precision: 3,
        message: "Invalid ISO 8601 UTC format with milliseconds"
      })
      .or(
        z.literal("", {
          message: "lastCreatedAt must be an empty string or a valid datetime"
        })
      )
  })
};

export const getImageUploadSignatureSchema = {
  params: z.object({
    folder: z.enum(["profile_images", "post_images"])
  })
};

// const isValidObjectID = (str: string) => {
//   if (Types.ObjectId.isValid(str) && String(new ObjectId(str)) === str)
//     return true;
//   else throw new Error("invalid ObjectID");
// };

// const isValidCloudinaryImageURL = (
//   requiredFolder: "user_profile_images" | "user_post_images"
// ) => {
//   // TODO: add check to see if the image actually exists in Cloudinary
//   return (url: string) => {
//     const expressionToMatch = new RegExp(
//       `^https://res.cloudinary.com/di3penpbh/image/upload/v[\d]+/${requiredFolder}/`
//     );
//     if (expressionToMatch.test(url)) return true;
//     else throw new Error("invalid Cloudinary image URL");
//   };
// };

// export const createNewPostValidations = [
//   // TODO: add validation to ensure that restaurantID and newRestaurantName don't both exist
//   body("ratings").exists().isArray({
//     max: 3,
//     min: 3
//   }),
//   body("ratings.*")
//     .isFloat({
//       min: 0,
//       max: 5
//     })
//     .isDivisibleBy(0.5),
//   body("imageURLs").exists().isArray(),
//   body("imageURLs.*").matches(/^https:\/\/res.cloudinary.com\/di3penpbh/),
//   body("others").exists().isArray(),
//   body("others.*").isString().custom(isValidObjectID),
//   body("title").exists().isString().isLength({ max: 60 }),
//   body("text").exists().isString(),
//   body("newRestaurantName").optional().isString(),
//   body("restaurantID").optional().custom(isValidObjectID)
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

// export const updateUserValidations = [
//   body("operation").exists().isString().isIn(["add", "remove", "replace"]),
//   body("path")
//     .exists()
//     .isString()
//     .isIn([
//       "/email, /password, /name, /username, /profileImageURL, /following"
//     ]),
//   body("value").exists(),
//   oneOf([
//     body("value").if(pathIsEmail).isEmail().normalizeEmail(),
//     body("value").if(pathIsFollowing).isString().custom(isValidObjectID),
//     body("value")
//       .if(pathIsprofileImageURL)
//       .custom(isValidCloudinaryImageURL("user_profile_images"))
//   ])
// ];

//TODO: add validations to ensure request fields which aren't part of the user document cannot be added to the url
// const getUserValidations;
