import dotenv from "dotenv";
dotenv.config()

export const PORT = 8080;
export const DB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@coffee.vhcyiht.mongodb.net/?retryWrites=true&w=majority`;
export const ROLE = {
  USER: "user",
  ADMIN: "admin"
}
