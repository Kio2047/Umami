import * as UserModel from "../Models/User";
import express from "express";

export const loadFeed = async function (req: express.Request, res: express.Response) {
  try {
    console.log("HELLLLLLLLLLLLLLLLOOOOOOOOOOOOOOOOOOOO")
    const { userID } = req.body;
    const feedData = await UserModel.loadFeed(userID);
    res.status(200).json(feedData);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};