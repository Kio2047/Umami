import * as UserModel from "../Models/User";
import * as PostModel from "../Models/Post"
import * as RestaurantModel from "../Models/Restaurant"
import mongoose, { Types } from "mongoose";
import express from "express";

export const getFeedPosts = async function (req: express.Request, res: express.Response) {
  try {
    console.log("yo")
    const userID = new mongoose.Types.ObjectId(req.params.userID);
    const feedPosts = await UserModel.getFeedPosts(userID);
    res.status(200).json(feedPosts);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getUserPosts = async function (req: express.Request, res: express.Response) {
  try {
    const userID = new mongoose.Types.ObjectId(req.params.userID);
    const userPosts = await UserModel.getUserPosts(userID);
    res.status(200).json(userPosts);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export const uploadImages = async function (req: express.Request, res: express.Response) {
  try{
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    // @ts-ignore
    const imagePaths = req.files.map((file) => `C:\Users\kiava\MyFiles\Software Engineering\Codeworks\Main Course\Projects\Solo Project\Umami\Server\\${file.path}`)
    res.status(201).json(imagePaths);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export const createNewPost = async function (req: express.Request, res: express.Response) {
  try {
    const newPostID = new Types.ObjectId();
    const postData = req.body;
    const { restaurant } = postData;
    const updatedRestaurant = await RestaurantModel.addPostToRestaurant({ name: restaurant, postID: newPostID} );
    let newPost;

    if (updatedRestaurant) {
      newPost = await PostModel.createNewPost({ ...postData, id: newPostID, restaurantID: updatedRestaurant._id });
    }
    else {
      const newRestaurant = await RestaurantModel.createNewRestaurant({ name: restaurant, posts: [newPostID] });
      newPost = await PostModel.createNewPost({...postData, id: newPostID, restaurantID: newRestaurant._id });
    }

    const userID = postData.author;
    const postID = newPostID;
    await UserModel.addPostToUser( {userID, postID} );
    res.status(201).json(newPost);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}