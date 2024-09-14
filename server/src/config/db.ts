import mongoose from "mongoose";
import { config } from "./config";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully.");
    });

    mongoose.connection.on("error", (err) => {
      console.log(`Error while connect with database: ${err}`);
    });

    await mongoose.connect(config.mongo_connection_uri as string);
  } catch (error) {
    console.log(`Failed to connect with database: ${error}`);
    process.exit(1);
  }
};
