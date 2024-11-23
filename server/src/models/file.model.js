import mongoose, { Schema } from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    file: {
      type: String, 
      required: true,
    },
  },
  { timestamps: true }
);

export const File =
  mongoose.models.UserModel || mongoose.model("File", fileSchema);
