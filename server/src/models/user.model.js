import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    isAdmin:{
      type: Boolean,
      default:false
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User =
  mongoose.models.UserModel || mongoose.model("User", userSchema);