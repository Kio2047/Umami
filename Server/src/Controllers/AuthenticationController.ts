import * as UserModel from "../Models/User";
import express from "express";

export const checkUserExists = async function (req: express.Request, res: express.Response) {
  try {
    const { email } = req.body;
    const doesExist = await UserModel.checkUserExists(email);
    res.status(200).json(doesExist);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const createNewUser = async function (req: express.Request, res: express.Response) {
  try {
    const newUserInfo = req.body;
    const newUserProfile = await UserModel.createNewUser(newUserInfo);
    res.status(201).json(newUserProfile);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const checkUserCredentials = async function (req: express.Request, res: express.Response) {
  try {
    console.log("hello");
    const submittedCredentials = req.body;
    const account = await UserModel.checkUserCredentials(submittedCredentials);
    if (!account) res.status(401).json("invalid details");
    else res.status(200).send(account);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};