import { mongoose } from ".";
import { restaurantSchema } from "../../../Models/schemas";
import { RawRestaurantDocument } from "../../../types/RestaurantTypes";
import { CreateOnePromise } from "../../../types/MongooseCRUDTypes";

const Restaurant = mongoose.model<RawRestaurantDocument>(
  "Restaurant",
  restaurantSchema
);

export const createNewDummyRestaurant = async function (
  newDummyRestaurantData: RawRestaurantDocument
): CreateOnePromise<RawRestaurantDocument> {
  const newDummyRestaurant = await Restaurant.create({
    ...newDummyRestaurantData
  });
  return newDummyRestaurant;
};
