import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { mongoose, connectDBClient } from "../Models/index";
import { createNewDummyUser } from "../Models/User";
import { createNewDummyPost } from "../Models/Post";
import { createNewDummyRestaurant } from "../Models/Restaurant";
import { hashPassword } from "../Modules/auth";

const seedDB = async function () {
  if (mongoose.connection.readyState !== 0) {
    console.log("Only seed the DB when the server is not running");
    return;
  }

  try {
    await connectDBClient();
  } catch (err) {
    console.log("An error occurred whilst attempting to connect to the DB");
    console.log(err);
  }

  try {
    mongoose.connection.db.dropDatabase();
  } catch (err) {
    console.log("An error occurred whilst attempting to clear the database");
    console.log(err);
  }

  const user1ID = new mongoose.Types.ObjectId();
  const user2ID = new mongoose.Types.ObjectId();
  const user3ID = new mongoose.Types.ObjectId();
  const user4ID = new mongoose.Types.ObjectId();
  const user5ID = new mongoose.Types.ObjectId();

  const post1ID = new mongoose.Types.ObjectId();
  const post2ID = new mongoose.Types.ObjectId();
  const post3ID = new mongoose.Types.ObjectId();
  const post4ID = new mongoose.Types.ObjectId();
  // const post5ID = new mongoose.Types.ObjectId;

  const restaurant1ID = new mongoose.Types.ObjectId(); // Bosco
  const restaurant2ID = new mongoose.Types.ObjectId(); // Pino's warung <-- I've actually been to this one, highly recommended
  const restaurant3ID = new mongoose.Types.ObjectId(); // Charro De Rio
  const restaurant4ID = new mongoose.Types.ObjectId(); // Antillean
  // const restaurant5ID = new mongoose.Types.ObjectId;

  // Create 5 dummy users
  const user1 = await createNewDummyUser({
    _id: user1ID,
    email: "samkay1@aol.com",
    passwordHash: await hashPassword("ilovecheese&77"),
    name: "Sam Kay",
    username: "sgk_99",
    profileImageURL:
      "https://scontent.flhr4-4.fna.fbcdn.net/v/t1.6435-9/48409102_2348750308533685_7597051252538605568_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Kwl0R9MnQmwAX9FpySt&_nc_ht=scontent.flhr4-4.fna&oh=00_AfAEQVM-Wja6iWzygsIwS-63nG2PI2-8127fBWC1JJvA9w&oe=644B54DD",
    following: [user2ID, user3ID, user4ID],
    followers: [user2ID, user3ID, user4ID]
  });

  const user2 = await createNewDummyUser({
    _id: user2ID,
    email: "kitshirley97@gmail.com",
    passwordHash: await hashPassword("Myfavouritepassword8*"),
    name: "Kit Shirley",
    username: "halloumi_queen",
    profileImageURL:
      "https://scontent.flhr4-4.fna.fbcdn.net/v/t1.6435-9/158877325_10225919781286340_1086636940453703433_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=3XOxzktIpqAAX-z8H64&_nc_ht=scontent.flhr4-4.fna&oh=00_AfDX-4H0QQOliIQztab08H2FRlcjKx1X67xx1ChcrM27Bg&oe=644B5E27",
    following: [user1ID, user3ID, user4ID],
    followers: [user1ID, user3ID, user4ID]
  });

  const user3 = await createNewDummyUser({
    _id: user3ID,
    email: "sajjadirvani@gmail.com",
    passwordHash: await hashPassword("Myleastfavouritepassword6^"),
    name: "Sajjad Irvani",
    username: "sushi_samurai_99",
    profileImageURL:
      "https://scontent.flhr4-3.fna.fbcdn.net/v/t39.30808-6/271156934_2604480466362629_2547902713314809487_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=lV4wS04xW8MAX-wChi5&_nc_ht=scontent.flhr4-3.fna&oh=00_AfA5rspHwgSIcfvg8ULId8U52N3P3BsYBgfOU6weAIfkwg&oe=6428F573",
    following: [user1ID, user2ID, user4ID],
    followers: [user1ID, user2ID, user4ID]
  });

  const user4 = await createNewDummyUser({
    _id: user4ID,
    email: "kiavash90@gmail.com",
    passwordHash: await hashPassword("ultra_5ecure_PW"),
    name: "Kio Shirazpour",
    username: "kio_shiraz",
    profileImageURL:
      "https://pps.whatsapp.net/v/t61.24694-24/294839335_732040164522381_3909308128657133963_n.jpg?ccb=11-4&oh=01_AdRSOjX_h3jXO4Z0b5aozxE5aEEkv3kGqejfaME9sBPRDQ&oe=643113C2",
    following: [user1ID, user2ID, user3ID],
    followers: [user1ID, user2ID, user3ID]
  });

  const user5 = await createNewDummyUser({
    _id: user5ID,
    email: "garehj96@yahoo.com",
    passwordHash: await hashPassword("123456789!0"),
    name: "Jamie Gareh",
    username: "keep_it_kosher",
    profileImageURL:
      "https://scontent.flhr4-3.fna.fbcdn.net/v/t31.18172-8/14258212_1134776443266692_4951971376847035652_o.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=-HrwR1YWfSEAX-vb8gG&_nc_ht=scontent.flhr4-3.fna&oh=00_AfAHpopYZYxd4zRqpyFR-uTbhgEqvuq8GerNX74QdYQJjQ&oe=644B665A",
    following: [],
    followers: []
  });

  // Create 5 dummy posts
  const post1 = await createNewDummyPost({
    _id: post1ID,
    author: user1ID,
    restaurant: restaurant1ID,
    ratings: [4.5, 3.5, 3],
    imageURLs: [
      "https://media-cdn.tripadvisor.com/media/photo-w/22/53/a1/05/caption.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-p/21/59/e1/06/grilled-aubergine-stir.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-p/22/53/a1/03/caption.jpg"
    ],
    title: "Next level Caribbean food that will break the bank",
    text: "Had the scallop ceviche and the octopus, crab and mackerel small plates which were all amazing. For mains we had the crab curry, tamarind chicken and the lamb cutlets, the curry was probably the best but all of these were totally sublime. To finish we had the plantain tarte tatin, chocolate torte and carrot cake with pineapple, all nice but not at the level of the starters. We washed them all down with a selection of ‘tropical’ cocktails as it’s 24/7 happy hour for July / August. It's far from cheap though - I'll probably be living off of baked beans and toast for the foreseeable future. Worth it? Not sure, but the food was wicked",
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    others: [user2ID]
  });

  const post2 = await createNewDummyPost({
    _id: post2ID,
    author: user2ID,
    restaurant: restaurant2ID,
    ratings: [5, 4, 5],
    imageURLs: [
      "https://media-cdn.tripadvisor.com/media/photo-w/1b/15/b7/24/pino-s-warung.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-w/1d/8d/fc/35/pino-s-warung.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-p/1d/8d/fc/38/pino-s-warung.jpg"
    ],
    title: "Best Indonesian Satay Chicken in London!!",
    text: "If you haven’t already tasted the Satay Chicken, you need to try them they are finger licking delicious!!! If you're in London and looking for authentic Indonesian street food, THIS IS the place to go! Highly highly recommended - this place is deffo worth a visit. The portions are quiet big for the price you pay. Hit me up if you're ever planning on going to this place 😂",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    others: []
  });

  const post3 = await createNewDummyPost({
    _id: post3ID,
    author: user3ID,
    restaurant: restaurant3ID,
    ratings: [4.5, 4, 5],
    imageURLs: [
      "https://media-cdn.tripadvisor.com/media/photo-w/24/ac/93/cf/caption.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-o/18/c2/49/5e/20190812-180127-largejpg.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-p/1e/41/10/c4/charro-de-rio.jpg"
    ],
    title: "I may never need to eat again",
    text: "An all you can eat rodizio grill? Are you for real? Everybody needs to embrace their inner glutton with a feast at this place. We were lucky enough to get a table without a booking last night, and the food was unreal - brisket, fillet steak, wagyu steak, minted lamb, teriyaki chicken, paprika chicken were among some of the many, including a wonderful selection of salads and homemade goulash. Service was top notch, and we loved the addition of hot water bottles to keep us warm - great touch! We can't wait to go back soon 😋😋 - just don't bring your veggie friends!",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    others: [user1ID]
  });

  const post4 = await createNewDummyPost({
    _id: post4ID,
    author: user1ID,
    restaurant: restaurant4ID,
    ratings: [4.5, 4.5, 4],
    imageURLs: [
      "https://media-cdn.tripadvisor.com/media/photo-p/22/28/eb/a9/bosco-pizzeria.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-p/22/28/eb/b1/bosco-pizzeria.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-p/22/28/eb/b5/bosco-pizzeria.jpg"
    ],
    title: "Close your eyes and you're in Italy!",
    text: "The aranacini and pizza are next level. Salads are great too. Ambience is lovely, it's got that Italian hustle and bustle. Love this place.",
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
    others: []
  });

  // Create 5 dummy restaurants
  const restaurant1 = await createNewDummyRestaurant({
    _id: restaurant1ID,
    name: "Antillean"
  });

  const restaurant2 = await createNewDummyRestaurant({
    _id: restaurant2ID,
    name: "Pino's Warung"
  });

  const restaurant3 = await createNewDummyRestaurant({
    _id: restaurant3ID,
    name: "Charro de Rio"
  });

  const restaurant4 = await createNewDummyRestaurant({
    _id: restaurant4ID,
    name: "Bosco Pizzeria"
  });

  console.log("DB successfully seeded");

  mongoose.connection.close();
};

seedDB();
