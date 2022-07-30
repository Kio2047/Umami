import mongoose from "mongoose";

export {mongoose}
export const connectDBClient = async function () {
  await mongoose.connect("mongodb://127.0.0.1:27017/UmamiDatabase").then(
    () => { console.log("Database successfully connected") },
    error => { console.log(error) }
  );
}