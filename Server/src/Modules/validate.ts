import { body, validationResult, matchedData } from "express-validator";

import { RequestHandler } from "express";

export const validateRequest: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
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

export const createNewPostValidations = [];
