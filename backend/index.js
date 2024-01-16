import express from "express";
import { PORT, DB_URI } from "./src/configs/global.config.js";
import mongoose from "mongoose";
import cors from "cors";
import logMiddleware from "./src/middlewares/logMiddleware.js";
import verifyTokenMiddleware from "./src/middlewares/verifyTokenMiddleware.js";
import authenticateUser from "./src/middlewares/authenticateUser.js";
import "punycode"

import authRoutes from "./src/routes/authRoutes.js";
import ingredientRoutes from "./src/routes/ingredientRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import ordersRoutes from "./src/routes/ordersRoutes.js";

const app = express();

app.use(cors("*"))
app.use(express.json())
app.use(logMiddleware)
app.use(verifyTokenMiddleware)

app.use("/api/user", authRoutes)
app.use("/api/ingredient", ingredientRoutes)
app.use("/api/product", authenticateUser, productRoutes)
app.use("/api/order", ordersRoutes)

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
