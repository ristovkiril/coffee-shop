import express from "express";
import { PORT, DB_URI } from "./configs/global.config.js";
import mongoose from "mongoose";
import cors from "cors";
import logMiddleware from "./middlewares/logMiddleware.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import "punycode"

import authRoutes from "./routes/authRoutes.js";
import ingredientRoutes from "./routes/ingredientRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(cors("*"))
app.use(express.json())
app.use(logMiddleware)
app.use(authMiddleware)

app.use("/api/user", authRoutes)
app.use("/api/ingredient", ingredientRoutes)
app.use("/api/product", productRoutes)

app.get(`/`, (req, res) => {

  res.status(200).send("Welcome to Coffee shop app")
})

mongoose.connect(DB_URI)
  .then(() => {
    console.log("Connectted to db");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    })
  })
  .catch(err => {
    console.log(err.message);
  })
