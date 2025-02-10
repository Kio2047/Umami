import { mongoose } from ".";
import { userSchema } from "../../../db/schemas";
import { CreateOnePromise } from "../../../types/MongooseTypes";
import { RawUserDocument } from "../../../modules/user/user.types";

const User = mongoose.model<RawUserDocument>("User", userSchema);

export const createNewDummyUser = async function (
  newDummyUserData: RawUserDocument
): CreateOnePromise<RawUserDocument> {
  const newDummyUser = await User.create({
    ...newDummyUserData
  });
  return newDummyUser;
};
