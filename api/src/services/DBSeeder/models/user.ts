import { mongoose } from ".";
import { userSchema } from "../../../Models/schemas";
import { CreateOnePromise } from "../../../types/MongooseCRUDTypes";
import { RawUserDocument } from "../../../types/UserTypes";

const User = mongoose.model<RawUserDocument>("User", userSchema);

export const createNewDummyUser = async function (
  newDummyUserData: RawUserDocument
): CreateOnePromise<RawUserDocument> {
  const newDummyUser = await User.create({
    ...newDummyUserData
  });
  return newDummyUser;
};
