import { NextFunction } from "express";
import { z } from "zod";

import {
  CustomRequest as Request,
  PrivateMiddlewareResponse as Response
} from "../../types/ExpressTypes";
import { PopulatedPostDocument } from "./post.types";
import { getUserByID } from "../user/user.model";
import { loadFeed, loadMoreFeed } from "./post.model";
import { ServerError } from "../../utils/ServerError";
import { getFeedPostsSchemas } from "./post.validations";
import sendResponse from "../../utils/sendResponse";

export const getFeedPosts = async function (
  req: Request<never, z.infer<typeof getFeedPostsSchemas.query>>,
  res: Response,
  next: NextFunction
) {
  try {
    const { lastCreatedAt } = req.query;
    const { sub: userID } = res.locals.tokenPayload;
    let posts: PopulatedPostDocument[];
    const user = await getUserByID(userID);
    if (!user) throw new ServerError("invalid user id");
    if (lastCreatedAt) {
      posts = await loadMoreFeed(user, new Date(lastCreatedAt));
    } else {
      posts = await loadFeed(user);
    }
    sendResponse(res, {
      status: 200,
      body: {
        status: "success",
        message: "Feed posts successfully retrieved",
        data: {
          posts: posts,
          lastCreatedAt: posts.at(-1)?.createdAt
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

// export const createNewPost = async function (
//   req: Request<NewPostData>,
//   res: Response<{ data: { newPost: RawPostDocument } }>,
//   next: NextFunction
// ) {
//   try {
//     const newPostData = req.body;
//     const userID = res.locals.tokenPayload.sub;

//     let restaurant: NullableHydratedDocument<RawRestaurantDocument>;

//     if (newPostData.restaurantID !== undefined) {
//       restaurant = await RestaurantModel.findRestaurantByID(
//         newPostData.restaurantID
//       );
//       if (!restaurant) {
//         return next(
//           new ServerError("invalid restaurant id", {
//             additionalInfo: `invalid id: ${newPostData.restaurantID}`
//           })
//         );
//       }
//     } else {
//       restaurant = await RestaurantModel.createNewRestaurant({
//         name: newPostData.newRestaurantName
//       });
//     }
//     const { restaurantID, newRestaurantName, ...rest } = newPostData;
//     const newPost = await PostModel.createNewPost({
//       ...rest,
//       restaurant: restaurant._id,
//       timestamp: new Date().toISOString(),
//       author: new Types.ObjectId(userID)
//     });
//     res.location(`/posts/${newPost._id}`);

//     res.status(201).json({ data: { newPost } });
//   } catch (err) {
//     next(err);
//   }
// };
