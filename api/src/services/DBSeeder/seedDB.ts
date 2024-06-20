import bcrypt from "bcrypt";
import { MongoServerError } from "mongodb";

import { mongoose, connectDBClient } from "./models/index";
import { createNewDummyUser } from "./models/user";
import { createNewDummyPost } from "./models/post";
import { createNewDummyRestaurant } from "./models/restaurant";
import seederLogger from "./logger";

const hashPassword = (password: string): Promise<string> =>
  bcrypt.hash(password, 10);

const getDaysInMilliseconds = (days: number): number => days * 24 * 3600 * 1000;

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

let retryCount = 0;
const maxRetries = 10;
const retryDelay = 5000;

const seedDB = async function (): Promise<void> {
  try {
    await connectToDB();

    try {
      await mongoose.connection.db.dropDatabase();
      seederLogger.info("Successfully cleared DB");
    } catch (err) {
      seederLogger.error(
        err,
        "An error occured while attempting to clear the DB"
      );
      throw err;
    }

    const userIds = await createDummyUsers();
    const restaurantIds = await createDummyRestaurants();
    await createDummyPosts(userIds, restaurantIds);
    seederLogger.info("Successfully seeded DB");
  } catch (err) {
    seederLogger.error("DB seed unsuccessful - closing DB connection");
  } finally {
    mongoose.connection.close();
    seederLogger.info("Successfully closed connection with DB");
  }
};

const connectToDB = async function (): Promise<void> {
  try {
    await connectDBClient();
  } catch (err) {
    seederLogger.error(
      err,
      "An error occurred while attempting to connect to the DBB:"
    );

    if (!(err instanceof MongoServerError) || err.code === 8000) {
      throw err;
    }
    if (retryCount === maxRetries) {
      seederLogger.error(
        "Multiple unsuccessful attempts to connect to the DB were made. Please review error logs"
      );
      throw err;
    }
    retryCount++;
    seederLogger.info(
      `Attempting to reconnect to DB in ${retryDelay / 1000} seconds`
    );
    await delay(retryDelay);
    connectToDB();
  }
};

const createDummyUsers = async function (): Promise<mongoose.Types.ObjectId[]> {
  const user1ID = new mongoose.Types.ObjectId();
  const user2ID = new mongoose.Types.ObjectId();
  const user3ID = new mongoose.Types.ObjectId();
  const user4ID = new mongoose.Types.ObjectId();
  const user5ID = new mongoose.Types.ObjectId();

  const dummyUserData = [
    {
      _id: user1ID,
      email: "john.doe@example.com",
      passwordHash: await hashPassword("ilovecheese&77"),
      name: "John Doe",
      username: "pasta_paladin",
      profileImageURL:
        "https://res.cloudinary.com/di3penpbh/image/upload/v1717959968/user_profile_images/profile_pic_4_urqevg.jpg",
      following: [user2ID, user3ID, user4ID],
      followers: [user2ID, user3ID, user4ID],
      createdAt: new Date(Date.now() - getDaysInMilliseconds(10)),
      updatedAt: new Date(Date.now() - getDaysInMilliseconds(10))
    },
    {
      _id: user2ID,
      email: "jane.smith@example.com",
      passwordHash: await hashPassword("Myfavouritepassword8*"),
      name: "Jane Smith",
      username: "guacamole_guru",
      profileImageURL:
        "https://res.cloudinary.com/di3penpbh/image/upload/v1717959966/user_profile_images/profile_pic_1_b3tlre.jpg",
      following: [user1ID, user3ID, user4ID],
      followers: [user1ID, user3ID, user4ID],
      createdAt: new Date(Date.now() - getDaysInMilliseconds(10)),
      updatedAt: new Date(Date.now() - getDaysInMilliseconds(10))
    },
    {
      _id: user3ID,
      email: "raul.calvillo@example.com",
      passwordHash: await hashPassword("1111111111111"),
      name: "Raul Calvillo",
      username: "sushi_samurai_99",
      profileImageURL:
        "https://res.cloudinary.com/di3penpbh/image/upload/v1717959966/user_profile_images/profile_pic_2_frera2.jpg",
      following: [user1ID, user2ID, user4ID],
      followers: [user1ID, user2ID, user4ID],
      createdAt: new Date(Date.now() - getDaysInMilliseconds(10)),
      updatedAt: new Date(Date.now() - getDaysInMilliseconds(10))
    },
    {
      _id: user4ID,
      email: "carmelita_ramos@example.co.uk",
      passwordHash: await hashPassword("ultra_5ecure_PW"),
      name: "Carmelita Ramos",
      username: "halloumi_queen",
      profileImageURL:
        "https://res.cloudinary.com/di3penpbh/image/upload/v1717959967/user_profile_images/profile_pic_3_zojp4e.jpg",
      following: [user1ID, user2ID, user3ID],
      followers: [user1ID, user2ID, user3ID],
      createdAt: new Date(Date.now() - getDaysInMilliseconds(10)),
      updatedAt: new Date(Date.now() - getDaysInMilliseconds(10))
    },
    {
      _id: user5ID,
      email: "kiara.johnson@example.com",
      passwordHash: await hashPassword("123456789!0"),
      name: "Kiara Johnson",
      username: "i_like_pizza_ok",
      profileImageURL:
        "https://res.cloudinary.com/di3penpbh/image/upload/v1717959967/user_profile_images/profile_pic_5_epjjl3.jpg",
      following: [],
      followers: [],
      createdAt: new Date(Date.now() - getDaysInMilliseconds(10)),
      updatedAt: new Date(Date.now() - getDaysInMilliseconds(10))
    }
  ];

  try {
    const createdUsers = await Promise.all(
      dummyUserData.map((data) => createNewDummyUser(data))
    );
    return createdUsers.map((user) => user._id);
  } catch (err) {
    seederLogger.error(err, "Error creating dummy users");
    throw err;
  }
};

const createDummyRestaurants = async function (): Promise<
  mongoose.Types.ObjectId[]
> {
  const restaurant1ID = new mongoose.Types.ObjectId();
  const restaurant2ID = new mongoose.Types.ObjectId();
  const restaurant3ID = new mongoose.Types.ObjectId();
  const restaurant4ID = new mongoose.Types.ObjectId();

  const dummyRestaurantData = [
    {
      _id: restaurant1ID,
      name: "Antillean",
      createdAt: new Date(Date.now() - getDaysInMilliseconds(10)),
      updatedAt: new Date(Date.now() - getDaysInMilliseconds(10))
    },
    {
      _id: restaurant2ID,
      name: "Pino's Warung",
      createdAt: new Date(Date.now() - getDaysInMilliseconds(10)),
      updatedAt: new Date(Date.now() - getDaysInMilliseconds(10))
    },
    {
      _id: restaurant3ID,
      name: "Charro de Rio",
      createdAt: new Date(Date.now() - getDaysInMilliseconds(10)),
      updatedAt: new Date(Date.now() - getDaysInMilliseconds(10))
    },
    {
      _id: restaurant4ID,
      name: "Bosco Pizzeria",
      createdAt: new Date(Date.now() - getDaysInMilliseconds(10)),
      updatedAt: new Date(Date.now() - getDaysInMilliseconds(10))
    }
  ];
  try {
    const createdRestaurants = await Promise.all(
      dummyRestaurantData.map((data) => createNewDummyRestaurant(data))
    );

    return createdRestaurants.map((restaurant) => restaurant._id);
  } catch (err) {
    seederLogger.error(err, "Error creating dummy restaurants");
    throw err;
  }
};

const createDummyPosts = async function (
  userIds: mongoose.Types.ObjectId[],
  restaurantIds: mongoose.Types.ObjectId[]
): Promise<void> {
  const [user1Id, user2Id, user3Id, user4Id, user5Id] = userIds;
  const [restaurant1Id, restaurant2Id, restaurant3Id, restaurant4Id] =
    restaurantIds;

  const dummyPostData = [
    {
      _id: new mongoose.Types.ObjectId(),
      author: user1Id,
      restaurant: restaurant1Id,
      ratings: [4.5, 3.5, 3],
      imageURLs: [],
      title: "Placeholder",
      text: "Placeholder",
      others: [user2Id],
      createdAt: new Date(Date.now() - getDaysInMilliseconds(0.125)),
      updatedAt: new Date(Date.now() - getDaysInMilliseconds(0.125))
    },
    {
      _id: new mongoose.Types.ObjectId(),
      author: user2Id,
      restaurant: restaurant2Id,
      ratings: [5, 4, 5],
      imageURLs: [],
      title: "Placeholder",
      text: "Placeholder",
      others: [],
      createdAt: new Date(Date.now() - getDaysInMilliseconds(0.5)),
      updatedAt: new Date(Date.now() - getDaysInMilliseconds(0.5))
    },
    {
      _id: new mongoose.Types.ObjectId(),
      author: user3Id,
      restaurant: restaurant3Id,
      ratings: [4.5, 4, 5],
      imageURLs: [],
      title: "Placeholder",
      text: "Placeholder",
      others: [user1Id],
      createdAt: new Date(Date.now() - getDaysInMilliseconds(1)),
      updatedAt: new Date(Date.now() - getDaysInMilliseconds(1))
    },
    {
      _id: new mongoose.Types.ObjectId(),
      author: user1Id,
      restaurant: restaurant4Id,
      ratings: [4.5, 4.5, 4],
      imageURLs: [],
      title: "Placeholder",
      text: "Placeholder",
      others: [],
      createdAt: new Date(Date.now() - getDaysInMilliseconds(2)),
      updatedAt: new Date(Date.now() - getDaysInMilliseconds(2))
    }
  ];
  try {
    await Promise.all(dummyPostData.map((data) => createNewDummyPost(data)));
  } catch (err) {
    seederLogger.error(err, "Error creating dummy posts");
    throw err;
  }
};

seedDB();
