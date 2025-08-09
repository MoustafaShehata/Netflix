import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV_VARS.MONGO_URI);
    console.log("Database connected...");
  } catch (error) {
    console.log("Error while connect to database");
    process.exit(1);
  }
};
