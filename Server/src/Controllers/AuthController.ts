import express from "express";

import * as UserModel from "../Models/User";
import { RequestHandler } from "express";
import { NewUserDetails } from "../types";

// export const checkUserExists: RequestHandler = async function (req, res) {
//   try {
//     const { email } = req.body;
//     const doesExist = await UserModel.checkUserExists(email);
//     res.status(200).json(doesExist);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// };

export const createNewUser: RequestHandler = async function (req, res) {
  try {
    const newUserDetails: NewUserDetails = req.body;
    const newUserProfile = await UserModel.createNewUser(newUserDetails);
    res.status(201).json(newUserProfile);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const loginUser: RequestHandler = async function (req, res) {
  try {
    const credentials = req.body;
    const account = await UserModel.checkUserCredentials(credentials);
    if (!account) {
      res.status(401).json("invalid details");
    } else {
      res.status(200).send(account);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
