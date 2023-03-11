import express from "express";

import { hashPassword, createJWT } from "../Modules/auth";
import * as UserModel from "../Models/User";
import { RequestHandler } from "express";
import { NewUserDetailsPostHash, NewUserDetailsPreHash } from "../types";

// export const checkUserExists: RequestHandler = async function (req, res) {
//   try {
//     const { email } = req.body;
//     const doesExist = await UserModel.checkUserExists(email);
//     res.status(200).json(doesExist);
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(500);
//   }
// };

export const createNewUser: RequestHandler = async function (req, res, next) {
  try {
    const newUserDetailsPreHash: NewUserDetailsPreHash = req.body;
    const passwordHash = await hashPassword(newUserDetailsPreHash.password);
    const { password, ...rest } = newUserDetailsPreHash;
    const newUserDetailsPostHash: NewUserDetailsPostHash = {
      ...rest,
      passwordHash
    };
    const newUserProfile = await UserModel.createNewUser(
      newUserDetailsPostHash
    );
    // TODO: Should profile containing the passwordHash be returned? seems better to not expose that property to the client
    res.status(201).json({
      data: {
        createdProfile: {
          ...newUserProfile.toObject(),
          // Setting this property to undefined removes it from the JSON response body,
          // so the hash is not sent back to the client
          passwordHash: undefined,
          password
        },
        token: createJWT(newUserProfile)
      }
    });
  } catch (err) {
    if (err.code === 11000 && err.keyValue?.email === req.body.email) {
      err.type = "duplicate value";
      err.duplicateKey = "email";
    }
    next(err);
  }
};

export const loginUser: RequestHandler = async function (req, res, next) {
  try {
    const credentials = req.body;
    const account = await UserModel.checkUserCredentials(credentials);
    if (!account) {
      res.status(401).json("invalid details");
    } else {
      res.status(200).send(account);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
