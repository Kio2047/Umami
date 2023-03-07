import mongoose from "mongoose";

mongoose.connection.on("connected", function () {
  console.log("DB connection successful");
  // console.log(`Connected to DB ${process.env.DB_NAME}`);
});

export const connectDBClient = async function () {
  if (!process.env.DB_URL) {
    await mongoose.connect(
      `mongodb://127.0.0.1:${process.env.LOCAL_DB_PORT || 27017}/UmamiDB`
    );
  } else {
    await mongoose.connect(process.env.DB_URL, {
      user: process.env.DB_USER_USERNAME,
      pass: process.env.DB_USER_PASSWORD,
      dbName: process.env.DB_NAME
    });
  }
};

export { mongoose };
