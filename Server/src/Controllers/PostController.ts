import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";

import * as UserModel from "../Models/User";
import * as PostModel from "../Models/Post";
import * as RestaurantModel from "../Models/Restaurant";
import mongoose, { HydratedDocument, Types } from "mongoose";
import express, { RequestHandler } from "express";
import { CreateOneResult, FindOneResult } from "../types/MongooseCRUDTypes";

import { RawPostDocument } from "../types/PostTypes";
import { RawRestaurantDocument } from "../types/RestaurantTypes";
import { ReceivedNewPostData } from "../types/PostTypes";

export const createNewPost: RequestHandler = async function (
  req: Request<ParamsDictionary, any, ReceivedNewPostData>,
  res,
  next
) {
  try {
    const newPostData = req.body;
    let restaurant: FindOneResult<RawRestaurantDocument>;
    let newPost: CreateOneResult<RawPostDocument>;

    if (newPostData.restaurantID !== undefined) {
      restaurant = await RestaurantModel.findRestaurantByID(
        newPostData.restaurantID
      );
      if (!restaurant) {
        res.status(404).json({ message: "invalid restaurant ID" });
        return;
      } else {
        newPost = await PostModel.createNewPost(newPostData);
      }
    } else {
      const newRestaurant = await RestaurantModel.createNewRestaurant({
        name: newPostData.newRestaurantName
      });
      const { newRestaurantName, ...rest } = newPostData;
      newPost = await PostModel.createNewPost({
        ...rest,
        restaurantID: newRestaurant._id
      });
    }
    res.status(200).json({ data: newPost });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

// export const getFeedPosts = async function (req: express.Request, res: express.Response) {
//   try {
//     console.log("yo")
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
