import { Types } from "mongoose";

export interface RawRestaurantDocument {
  _id: Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
