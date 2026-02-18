import dotenv from "dotenv";

dotenv.config();

export const ENV_VARS = {
  PORT: process.env.PORT || 8000,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URL: process.env.MONGO_URI,
  MAILTRAP_API_TOKEN: process.env.MAILTRAP_API_TOKEN,
  TMDB_API_TOKEN: process.env.TMDB_API_TOKEN,
  CLIENT_URL: process.env.CLIENT_URL,
};
