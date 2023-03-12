import { mongoose } from "./index";
import {
  FindOnePromise,
  RawRestaurantDocument,
  RestaurantNewPost
} from "../types/types";
import { restaurantSchema } from "./schemas";

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

// Will need to be restructured once the places api is integrated with the front end

export const createNewRestaurant = async function (
  newRestaurantDetails: RawRestaurantDocument
) {
  const newRestaurant = await Restaurant.create({
    // _id: id ? id : new mongoose.Types.ObjectId(),
    // name,
    ...newRestaurantDetails
  });
  return newRestaurant;
};

export const findRestaurantByID = async function (
  id: mongoose.Types.ObjectId
): FindOnePromise<RawRestaurantDocument> {
  const restaurant = await Restaurant.findById(id);
  return restaurant;
};

// export const addPostToRestaurant = async function ({
//   name,
//   postID
// }: RestaurantNewPost) {
//   const restaurant = await Restaurant.findOne({ name });
//   if (!restaurant) return;
//   // @ts-ignore: Object ID bug
//   restaurant.posts.push(postID);
//   await restaurant.save();
//   return restaurant;
// };

// // export const searchbarRestaurantMatch = async function ( name: string ) {
// //   const regex = new RegExp(name, 'i');
// //   const matchedRestaurants = await Restaurant.find({ name: {$regex: regex} });
// //   return matchedRestaurants;
// // };
