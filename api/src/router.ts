import { Router } from "express";

import * as ImageUploadController from "./Controllers/ImageUploadController";
import { updateUserValidations, validateRequest } from "./Modules/validations";
import * as UserController from "./Controllers/UserController";

const protectedRouter = Router();

protectedRouter.get(
  "/media-upload-signature/profile-image",
  ImageUploadController.generateProfileImageUploadSignature
);

protectedRouter.patch(
  "/users/me",
  updateUserValidations,
  validateRequest,
  UserController.updateUser
);

export default protectedRouter;
