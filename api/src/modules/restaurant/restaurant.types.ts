import { InferSchemaType } from "../../types/MongooseTypes";
import { restaurantSchema } from "src/db/schemas";

export type RawRestaurantDocument = InferSchemaType<typeof restaurantSchema>;
