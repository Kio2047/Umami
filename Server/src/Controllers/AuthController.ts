import express from "express";
import bcrypt from "bcrypt";

import * as UserModel from "../Models/User";
import { RequestHandler } from "express";
import { NewUserDetailsPostHash, NewUserDetailsPreHash } from "../types";

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
    const newUserDetailsPreHash: NewUserDetailsPreHash = req.body;
    const passwordHash = await bcrypt.hash(newUserDetailsPreHash.password, 10);
    const { password, ...rest } = newUserDetailsPreHash;
    const newUserDetailsPostHash: NewUserDetailsPostHash = {
      ...rest,
      passwordHash
    };
    const newUserProfile = await UserModel.createNewUser(
      newUserDetailsPostHash
    );
    res.status(201).json({
      data: {
        createdProfile: newUserProfile
        // token: token
      }
    });
  } catch (error) {
    if (error.code === 11000 && error.keyValue?.email === req.body.email) {
      error.type = "duplicate value";
      error.duplicateKey = "email";
    }
    console.log("heyho:", error);
    console.log("error code", error.code);
    console.log("message:", error.message);
    // res.json({  });
    res.sendStatus(500);
  }
};

// export const loginUser: RequestHandler = async function (req, res) {
//   try {
//     const credentials = req.body;
//     const account = await UserModel.checkUserCredentials(credentials);
//     if (!account) {
//       res.status(401).json("invalid details");
//     } else {
//       res.status(200).send(account);
//     }
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// };
