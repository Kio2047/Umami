import { mongoose } from "./index";
import { restaurantSchema } from "./schemas";

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export { Restaurant }