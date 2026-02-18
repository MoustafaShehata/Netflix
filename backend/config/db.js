import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV_VARS.MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting to database:" + error.message);
    process.exit(1);
  }
};
