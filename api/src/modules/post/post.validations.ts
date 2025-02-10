import { z } from "zod";

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

//   import { Types } from "mongoose";

// const { ObjectId } = Types;

// const isValidObjectID = (str: string) => {
//   if (Types.ObjectId.isValid(str) && String(new ObjectId(str)) === str)
//     return true;
//   else throw new Error("invalid ObjectID");
// };
