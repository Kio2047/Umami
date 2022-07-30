import * as UserModel from "../Models/User";
import express from "express";

export const checkUserExists = async function (req: express.Request, res: express.Response) {
  try {
    await UserModel.checkUserExists
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}