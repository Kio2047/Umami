import mongoose from "mongoose";

mongoose.connection.on("connected", function () {
  console.log("Successfully connected to DB");
  // console.log(`Successfully connected to DB ${process.env.DB_NAME}`);
});

export const connectDBClient = async function () {
  if (!process.env.DB_URI) {
    throw new Error("No DB URI provided");
  } else if (!process.env.DB_NAME) {
    throw new Error("No DB name provided");
  }
  await mongoose.connect(process.env.DB_URI, {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER_USERNAME,
    pass: process.env.DB_USER_PASSWORD
  });
};

export { mongoose };
