import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";

import * as UserModel from "../Models/User";
import * as PostModel from "../Models/Post";
import * as RestaurantModel from "../Models/Restaurant";
import { RequestHandler } from "express";
import { CreateOneResult, FindOneResult } from "../types/MongooseCRUDTypes";

import { RawPostDocument } from "../types/PostTypes";
import { RawRestaurantDocument } from "../types/RestaurantTypes";
import { ReceivedNewPostData } from "../types/PostTypes";
import { Types } from "mongoose";

// TODO: add type declaration for res.locals (scoped to the protected router endpoints only)

export const createNewPost: RequestHandler = async function (
  req: Request<ParamsDictionary, any, ReceivedNewPostData>,
  res,
  next
) {
  try {
    const newPostData = req.body;
    const userID = res.locals.tokenPayload.sub;

    let restaurant: FindOneResult<RawRestaurantDocument>;
    let newPost: CreateOneResult<RawPostDocument>;

    if (newPostData.restaurantID !== undefined) {
      restaurant = await RestaurantModel.findRestaurantByID(
        newPostData.restaurantID
      );
      if (!restaurant) {
        res.status(404).json({ error: { message: "invalid restaurant ID" } });
        return;
      }
    } else {
      restaurant = await RestaurantModel.createNewRestaurant({
        name: newPostData.newRestaurantName
      });
    }
    const { restaurantID, newRestaurantName, ...rest } = newPostData;
    newPost = await PostModel.createNewPost({
      ...rest,
      restaurant: restaurant._id,
      timestamp: new Date().toISOString(),
      author: new Types.ObjectId(userID)
    });
    res.status(200).json({ data: { newPost } });
  } catch (err) {
    next(err);
  }
};

// export const getFeedPosts = async function (req: express.Request, res: express.Response) {
//   try {
//     const userID = new mongoose.Types.ObjectId(req.params.userID);
//     const feedPosts = await UserModel.getFeedPosts(userID);
//     res.status(200).json(feedPosts);
//   }
//   catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// };

// export const getUserPosts = async function (req: express.Request, res: express.Response) {
//   try {
//     const userID = new mongoose.Types.ObjectId(req.params.userID);
//     const userPosts = await UserModel.getUserPosts(userID);
//     res.status(200).json(userPosts);
//   }
//   catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// }

// export const uploadImages = async function (req: express.Request, res: express.Response) {
//   try{
//     const files = req.files as { [fieldname: string]: Express.Multer.File[] };
//     // @ts-ignore
//     const imagePaths = req.files.map((file) => `C:\Users\kiava\MyFiles\Software Engineering\Codeworks\Main Course\Projects\Solo Project\Umami\Server\\${file.path}`)
//     res.status(201).json(imagePaths);
//   }
//   catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// }
