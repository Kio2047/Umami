import { mongoose } from ".";
import { restaurantSchema } from "../../../db/schemas";
import { RawRestaurantDocument } from "../../../modules/restaurant/restaurant.types";
import { CreateOnePromise } from "../../../types/MongooseTypes";

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
