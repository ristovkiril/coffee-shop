import mongoose from "mongoose";
import { ROLE } from "../configs/global.config.js";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: ROLE.USER },
  },
  { collection: 'user-data', timestamps: true }
)

export const User = mongoose.model('UserData', UserSchema)