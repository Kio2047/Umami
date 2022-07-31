import * as UserModel from "../Models/User";
import * as PostModel from "../Models/Post"
import * as RestaurantModel from "../Models/Restaurant"
import { Types } from "mongoose";
import express from "express";

// export const loadFeed = async function (req: express.Request, res: express.Response) {
//   try {
//     const { userID } = req.body;
//     const feedData = await UserModel.loadFeed(userID);
//     res.status(200).json(feedData);
//   }
//   catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// };

export const createNewPost = async function (req: express.Request, res: express.Response) {
  try {
    const newPostID = new Types.ObjectId();
    const postData = req.body;
    const { restaurantName } = postData;
    const updatedRestaurant = await RestaurantModel.findRestaurantAndAddPost({ name: restaurantName, postID: newPostID} );
    let newPost;

    if (updatedRestaurant) {
      newPost = await PostModel.createNewPost({ ...postData, id: newPostID, restaurantID: updatedRestaurant._id });
    }
    else {
      const newRestaurant = await RestaurantModel.createNewRestaurant({ name: restaurantName, posts: [newPostID] });
      newPost = await PostModel.createNewPost({...postData, id: newPostID, restaurantID: newRestaurant._id });
    }

    const userID = postData.authorID;
    const postID = newPostID;
    await UserModel.addPostToUser( {userID, postID} );
    res.status(201).json(newPost);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}