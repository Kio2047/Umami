import {
  body,
  validationResult,
  matchedData,
  check,
  CustomValidator,
  oneOf
} from "express-validator";
import { RequestHandler } from "express";
import { Types } from "mongoose";
const { ObjectId } = Types;

export const validateRequest: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ message: errors.array() });
  } else {
    const filteredBody = matchedData(req, {
      locations: ["body"],
      includeOptionals: true
    });
    req.body = filteredBody;
    next();
  }
};

const isValidObjectID = (str: string) => {
  if (Types.ObjectId.isValid(str) && String(new ObjectId(str)) === str)
    return true;
  else throw new Error("invalid ObjectID");
};

const isValidCloudinaryImageURL = (
  requiredFolder: "user_profile_images" | "user_post_images"
) => {
  // TODO: add check to see if the image actually exists in Cloudinary
  return (url: string) => {
    const expressionToMatch = new RegExp(
      `^https://res.cloudinary.com/di3penpbh/image/upload/v[\d]+/${requiredFolder}/`
    );
    if (expressionToMatch.test(url)) return true;
    else throw new Error("invalid Cloudinary image URL");
  };
};

export const createNewUserValidations = [
  body("email").exists().isString().isEmail().normalizeEmail(),
  body("name")
    .exists()
    .isString()
    .matches(/[\w ]+/i)
    // Name doesn't contain more than one whitespace character in a row
    .not()
    .matches(/\s{2,}/),
  body("username")
    .exists()
    .isString()
    .isLength({ min: 1, max: 20 })
    .matches(/^[\w.]+$/),
  body("password")
    .exists()
    .isString()
    .isLength({ min: 8 })
    // Password contains at least one number and at least one special character
    .matches(/[0-9]/)
    .matches(/[^A-Za-z0-9]/)
];

export const loginUserValidations = [
  body("usernameOrEmail").exists().isString(),
  oneOf([
    body("usernameOrEmail").isEmail().normalizeEmail(),
    body("usernameOrEmail")
      .not()
      .matches(/[^\w\.]/)
  ]),
  body("password").exists().isString()
];

export const createNewPostValidations = [
  // TODO: add validation to ensure that restaurantID and newRestaurantName don't both exist
  body("ratings").exists().isArray({
    max: 3,
    min: 3
  }),
  body("ratings.*")
    .isFloat({
      min: 0,
      max: 5
    })
    .isDivisibleBy(0.5),
  body("imageURLs").exists().isArray(),
  body("imageURLs.*").matches(/^https:\/\/res.cloudinary.com\/di3penpbh/),
  body("others").exists().isArray(),
  body("others.*").isString().custom(isValidObjectID),
  body("title").exists().isString().isLength({ max: 60 }),
  body("text").exists().isString(),
  body("newRestaurantName").optional().isString(),
  body("restaurantID").optional().custom(isValidObjectID)
];

const pathIsEmail: CustomValidator = (value, { req }) => {
  return req.body.path === "/email";
};
const pathIsPassword: CustomValidator = (value, { req }) => {
  return req.body.path === "/password";
};
const pathIsName: CustomValidator = (value, { req }) => {
  return req.body.path === "/name";
};
const pathIsUsername: CustomValidator = (value, { req }) => {
  return req.body.path === "/username";
};
const pathIsprofileImageURL: CustomValidator = (value, { req }) => {
  return req.body.path === "/profileImageURL";
};
const pathIsFollowing: CustomValidator = (value, { req }) => {
  return req.body.path === "/following";
};
// const followIdIsNotOwn: CustomValidator = (value, { req }) => {
//   return;
// };

export const updateUserValidations = [
  body("operation").exists().isString().isIn(["add", "remove", "replace"]),
  body("path")
    .exists()
    .isString()
    .isIn([
      "/email, /password, /name, /username, /profileImageURL, /following"
    ]),
  body("value").exists(),
  oneOf([
    body("value").if(pathIsEmail).isEmail().normalizeEmail(),
    body("value").if(pathIsFollowing).isString().custom(isValidObjectID),
    body("value")
      .if(pathIsprofileImageURL)
      .custom(isValidCloudinaryImageURL("user_profile_images"))
  ])
];

//TODO: add validations to ensure request fields which aren't part of the user document cannot be added to the url
// const getUserValidations;
