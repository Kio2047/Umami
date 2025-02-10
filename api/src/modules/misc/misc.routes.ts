import { Router } from "express";

import validatorGenerator from "../../middleware/validatorGenerator";
import authenticator from "../../middleware/authenticator";
import * as ImageUploadController from "./misc.controller";
import { getImageUploadSignatureSchema } from "./misc.validations";

const miscRouter = Router();

miscRouter.get(
  "/image-upload-signature/:folder",
  authenticator,
  validatorGenerator(getImageUploadSignatureSchema),
  ImageUploadController.generateImageUploadSignature
);

export default miscRouter;
