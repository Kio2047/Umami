import { body, validationResult, matchedData, check } from "express-validator";
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

export const createNewUserValidations = [
  body("email").exists().isString().isEmail().normalizeEmail(),
  body("profilePictureURL")
    .exists()
    .isString()
    // TODO: Add check to see if the image actually exists in Cloudinary
    .matches(/^https:\/\/res.cloudinary.com\/di3penpbh/),
  body("name")
    .exists()
    .isString()
    .matches(/[\w ]+/)
    // Name doesn't contain more than one whitespace character in a row
    .not()
    .matches(/\s{2,}/),
  body("password")
    .exists()
    .isString()
    .isLength({ min: 8 })
    // Password contains at least one number and at least one special character
    .matches(/[0-9]/)
    .matches(/[^A-Za-z0-9]/)
];

export const loginUserValidations = [
  body("email").exists().isString().isEmail().normalizeEmail(),
  body("password").exists().isString()
];

export const createNewPostValidations = [
  // add validation to ensure that restaurantID and newRestaurantName don't both exist
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

export const followUserValidations = [
  body("userToFollowID").exists().isString().custom(isValidObjectID)
];
