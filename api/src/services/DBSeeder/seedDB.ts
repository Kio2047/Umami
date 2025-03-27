import bcrypt from "bcryptjs";
import { MongoServerError } from "mongodb";

import { mongoose, connectDBClient } from "./models/index";
import { createNewDummyUser } from "./models/user";
import { createNewDummyPost } from "./models/post";
import { createNewDummyRestaurant } from "./models/restaurant";
import seederLogger from "./logger";

const hashPassword = (password: string): Promise<string> =>
  bcrypt.hash(password, 10);

const generateDate = (daysPassed: number): Date => {
  const millisecondsPassed = daysPassed * 24 * 3600 * 1000;
  return new Date(Date.now() - millisecondsPassed);
};

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

let retryCount = 0;
const maxRetries = 10;
const retryDelay = 5000;

const seedDB = async function (): Promise<void> {
  try {
    await connectToDB();
    await clearDB();
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
      "An error occurred while attempting to connect to the DB:"
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
    await connectToDB();
  }
};

const clearDB = async () => {
  try {
    await mongoose.connection.db!.dropDatabase();
    seederLogger.info("Successfully cleared DB");
  } catch (err) {
    seederLogger.error(
      err,
      "An error occured while attempting to clear the DB"
    );
    throw err;
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
      createdAt: generateDate(10),
      updatedAt: generateDate(10),
      metadata: {
        completedAddProfileImageScreen: true
      }
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
      createdAt: generateDate(10),
      updatedAt: generateDate(10),
      metadata: {
        completedAddProfileImageScreen: true
      }
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
      createdAt: generateDate(10),
      updatedAt: generateDate(10),
      metadata: {
        completedAddProfileImageScreen: true
      }
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
      createdAt: generateDate(10),
      updatedAt: generateDate(10),
      metadata: {
        completedAddProfileImageScreen: true
      }
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
      createdAt: generateDate(10),
      updatedAt: generateDate(10),
      metadata: {
        completedAddProfileImageScreen: true
      }
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
  const restaurant5ID = new mongoose.Types.ObjectId();
  const restaurant6ID = new mongoose.Types.ObjectId();

  const dummyRestaurantData = [
    {
      _id: restaurant1ID,
      name: "Sessions Arts Club",
      createdAt: generateDate(10),
      updatedAt: generateDate(10)
    },
    {
      _id: restaurant2ID,
      name: "Ta' Turu - Where Crêpes Become Royalty",
      createdAt: generateDate(10),
      updatedAt: generateDate(10)
    },
    {
      _id: restaurant3ID,
      name: "Jin Kichi",
      createdAt: generateDate(10),
      updatedAt: generateDate(10)
    },
    {
      _id: restaurant4ID,
      name: "Takagiya",
      createdAt: generateDate(10),
      updatedAt: generateDate(10)
    },
    {
      _id: restaurant5ID,
      name: "The Chancellors",
      createdAt: generateDate(10),
      updatedAt: generateDate(10)
    },
    {
      _id: restaurant6ID,
      name: "Osteria Del Rione",
      createdAt: generateDate(10),
      updatedAt: generateDate(10)
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
  const [
    restaurant1Id,
    restaurant2Id,
    restaurant3Id,
    restaurant4Id,
    restaurant5Id,
    restaurant6Id
  ] = restaurantIds;

  const dummyPostData = [
    {
      _id: new mongoose.Types.ObjectId(),
      author: user1Id,
      restaurant: restaurant1Id,
      scores: {
        service: 4.5,
        atmosphere: 5,
        food: 3.5
      },
      imageURLs: [
        "https://res.cloudinary.com/di3penpbh/image/upload/v1739303474/post_images/example-842.jpg",
        "https://res.cloudinary.com/di3penpbh/image/upload/v1739303475/post_images/example-272.jpg",
        "https://res.cloudinary.com/di3penpbh/image/upload/v1739303473/post_images/example-849.jpg"
      ],
      title: "Sanctuary in the city",
      text: `This place is an absolute vibe. Walking in, one feels like they've stumbled into a dreamy, historic European hideaway - moody lighting, textured walls, the whole works. Cozy yet elegant. Service was flawless - attentive, charming, never overbearing. Food was less stellar but still had some strong moments. Oysters were fresh and briny, fennel salad was a nice opener - very light and citrusy. Mains were less strong, with the fish somewhat forgettable while the lamb, while tender, was suspended in a green minty sauce that drowned out all other flavours. Will certainly be returning though not necessarily for the food. Bring somebody to impress, order some drinks and starters, and let this place do the rest of the work 😎`,
      others: [user2Id],
      createdAt: generateDate(0.125),
      updatedAt: generateDate(0.125)
    },
    {
      _id: new mongoose.Types.ObjectId(),
      author: user4Id,
      restaurant: restaurant5Id,
      scores: {
        service: 3,
        atmosphere: 3,
        food: 5
      },
      imageURLs: [
        "https://res.cloudinary.com/di3penpbh/image/upload/v1739361803/post_images/example-738.jpg",
        "https://res.cloudinary.com/di3penpbh/image/upload/v1739361802/post_images/example-172.jpg"
      ],
      title: "Pain, suffering, and the best pizza in London",
      text: `The convoluted process one must endure to get their hands on this slice is unforgivable. A confusing and poorly thought-out booking policy. A frequently one-hour-plus wait for your food, during which you will witness, and eventually partake in, multiple near-trauma-inducing scuffles to secure a table as you realize said booking policy doesn't actually guarantee you a seat, only the dough for your pizza. And yet, the people continue to come here in their droves, with the coveted doughs often selling out weeks in advance.

      Why does the populace of London, a city blessed with no shortage of good pizza, willingly subject itself to this contrived form of torture for a basement-baked slice from an unassuming pub? Simple. The pizza is sensational. A rare, expertly done New York-style slice, which is a welcome departure from the Neopolitan style which seems to be all the rage these days. I must side with the other masochists who choose to dine here - it's worth the pain.`,
      others: [user1Id],
      createdAt: generateDate(0.5),
      updatedAt: generateDate(0.5)
    },
    {
      _id: new mongoose.Types.ObjectId(),
      author: user2Id,
      restaurant: restaurant2Id,
      scores: {
        service: 3.5,
        atmosphere: 4,
        food: 4.5
      },
      imageURLs: [
        "https://res.cloudinary.com/di3penpbh/image/upload/v1739361588/post_images/example-747.jpg",
        "https://res.cloudinary.com/di3penpbh/image/upload/v1739361588/post_images/example-354.jpg"
      ],
      title: "Heavy lies the crêpe crown",
      text: `With gluttony comes punishment. Your punishment for dining at this institution (that is the only appropriate word to describe it)? You will fail to enjoy crêpes from anywhere else henceforth. You must get the fig, walnut & honey galette. Just felt bad for the lady who was running back and forth between cooking and serving - running this place when it's busy should not be a one person job.`,
      others: [],
      createdAt: generateDate(0.5),
      updatedAt: generateDate(0.5)
    },
    {
      _id: new mongoose.Types.ObjectId(),
      author: user1Id,
      restaurant: restaurant4Id,
      scores: {
        service: 5,
        atmosphere: 5,
        food: 5
      },
      imageURLs: [
        "https://res.cloudinary.com/di3penpbh/image/upload/v1739361829/post_images/example-554.jpg",
        "https://res.cloudinary.com/di3penpbh/image/upload/v1739361830/post_images/example-181.jpg",
        "https://res.cloudinary.com/di3penpbh/image/upload/v1739361831/post_images/example-839.jpg",
        "https://res.cloudinary.com/di3penpbh/image/upload/v1739361830/post_images/example-189.jpg",
        "https://res.cloudinary.com/di3penpbh/image/upload/v1739361833/post_images/example-182.jpg",
        "https://res.cloudinary.com/di3penpbh/image/upload/v1739361830/post_images/example-978.jpg",
        "https://res.cloudinary.com/di3penpbh/image/upload/v1739362504/post_images/example-111.jpg"
      ],
      title: "Most authentic Japanese spot in London",
      text: `The definition of a hidden gem. Run by a brilliant couple, with chef Takagi-san working magic in the back and his wife Yuko-san providing wonderful service front-of-house. Every dish was phenomenal. Nasu dengaku was so good I briefly considered writing a poem while eating it. Wasabi soy salmon sashimi up there with the best sushi I've ever had. Sweet potato tempura probably the best tempura I've had in London. Mochi with red bean for dessert was unique and delicious. Unique and charming interior, full of plants and Japanese art and ceramics. Literally feels like you're being cooked for by a couple in their house somewhere in Japan. Don't come if you're in a hurry - this is an experience, not fast food.`,
      others: [],
      createdAt: generateDate(1),
      updatedAt: generateDate(1)
    },
    {
      _id: new mongoose.Types.ObjectId(),
      author: user2Id,
      restaurant: restaurant6Id,
      scores: {
        service: 4.5,
        atmosphere: 4,
        food: 4.5
      },
      imageURLs: [
        "https://res.cloudinary.com/di3penpbh/image/upload/v1739380831/post_images/example-719.jpg",
        "https://res.cloudinary.com/di3penpbh/image/upload/v1739380832/post_images/example-638.jpg"
      ],
      title: "The best deal in Rome (possibly in the World)",
      text: `Stopped for lunch during our trip at this very unassuming spot as it was close to where we were staying. Very small inside with tables tightly packed, with mostly local patrons which we (correctly) took to be a good sign. Our friendly waiter quickly provided us with a set lunch menu which included a bruschetta, pasta dish, and dessert along with coffee and water for a grand total of €10. Given this questionable pricing we lowered our expectations, but that wasn't necessary - while the bruschetta was forgettable, the carbonara was one of the best pastas I had on my trip. Possibly the best guanciale I've ever had. The homemade dessert and coffee were also stellar. I was somewhat bamboozled by the meal we had for the price. The experience made me realize that when we eat out in London, we're not paying for the food - we're paying for the rent.`,
      others: [user1Id],
      createdAt: generateDate(2.25),
      updatedAt: generateDate(2.25)
    },
    {
      _id: new mongoose.Types.ObjectId(),
      author: user3Id,
      restaurant: restaurant3Id,
      scores: {
        service: 3.5,
        atmosphere: 3.5,
        food: 4
      },
      imageURLs: [
        "https://res.cloudinary.com/di3penpbh/image/upload/v1739361770/post_images/example-829.jpg",
        "https://res.cloudinary.com/di3penpbh/image/upload/v1739361771/post_images/example-819.jpg"
      ],
      title: "Solid yakitori joint",
      text: `Do not be fooled by the diverse menu. This is a yakitori restaurant. As such, you should order yakitori. Our skewers were very tasty, the other food we had (nasu dengaku, sushi) wasn't as good. Friendly but slightly rushed service, quite tightly packed inside. Nearly caught an elbow to the face at one point from my dining neighbour on the next table. Worth coming for the skewers, but I wouldn't send somebody out of their way to go here 🍡.`,
      others: [user1Id],
      createdAt: generateDate(2.25),
      updatedAt: generateDate(2.25)
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
