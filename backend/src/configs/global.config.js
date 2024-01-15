import dotenv from "dotenv";
dotenv.config()

export const PORT = 8080;
export const DB_URI = process.env.DB_URI;
export const ROLE = {
  USER: "user",
  ADMIN: "admin"
}
