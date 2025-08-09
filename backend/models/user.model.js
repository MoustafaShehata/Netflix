import mongoose from "mongoose";

// userSchema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    default: "",
  },

  searchHistory: {
    type: Array,
    default: [],
  },
});

// create userModel

export const User = mongoose.model("User", userSchema);
