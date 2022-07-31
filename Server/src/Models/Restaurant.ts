import { mongoose } from "./index";
import { RestaurantData, RestaurantNewPost } from "../types";
import { restaurantSchema } from "./schemas";

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

// Will need to be restructured once the places api is integrated with the front-end

export const createNewRestaurant = async function ( {id, name, posts}: RestaurantData ) {
    console.log("this is happening");
    console.log(id);
    console.log(posts);
  const newRestaurant = await Restaurant.create({
    _id: id ? id : new mongoose.Types.ObjectId(),
    name,
    posts
  });
  return newRestaurant;
}

export const findRestaurantAndAddPost = async function ( { name, postID }: RestaurantNewPost ) {
  const restaurant = await Restaurant.findOne({ name });
  if (!restaurant) return;
  // @ts-ignore: Object ID bug
  restaurant.posts.push(postID);
  await restaurant.save();
  return restaurant;
}


// export const searchbarRestaurantMatch = async function ( name: string ) {
//   const regex = new RegExp(name, 'i');
//   const matchedRestaurants = await Restaurant.find({ name: {$regex: regex} });
//   return matchedRestaurants;
// };