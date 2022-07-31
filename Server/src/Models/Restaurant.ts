import { mongoose } from "./index";
import { RestaurantData, RestaurantNewPost } from "../types";
import { restaurantSchema } from "./schemas";

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

// Will need to be restructured once the places api is integrated with the front-end

export const createNewRestaurant = async function ( {id, name, posts}: RestaurantData ) {
  const newRestaurant = await Restaurant.create({
    _id: id ? id : mongoose.Types.ObjectId,
    name,
    posts
  })
}

export const findRestaurantAndAddPost = async function ( { name, postID }: RestaurantNewPost ) {
  const restaurant = await Restaurant.findOne({ name });
  if (!restaurant) return;
  restaurant.posts.push(postID);
  await restaurant.save();
  return restaurant;
}


// export const searchbarRestaurantMatch = async function ( name: string ) {
//   const regex = new RegExp(name, 'i');
//   const matchedRestaurants = await Restaurant.find({ name: {$regex: regex} });
//   return matchedRestaurants;
// };