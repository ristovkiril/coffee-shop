import dotenv from "dotenv";
dotenv.config()

export const PORT = 8080;
export const DB_URI = `mongodb+srv://ristovv36:ristovv36@coffee.vhcyiht.mongodb.net/?retryWrites=true&w=majority`;
export const ROLE = {
  USER: "user",
  ADMIN: "admin"
}
