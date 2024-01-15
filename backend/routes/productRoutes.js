import express from "express";
import { findById, findAll, create, update, deleteById } from "../service/productService.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/default", async (req, res) => {
  try {
    console.log("Fetch default")
    const products = await findAll(null);

    return res.status(200).json(products);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message })
  }
})

router.get("/", async (req, res) => {
  try {
    const products = await findAll(req.user.id);

    return res.status(200).json(products);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await findById(id);

    return res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message })
  }
})

router.post("/default", adminMiddleware, async (req, res) => {
  try {
    const { name, description, price, ingredients } = req.body;
    const product = await create(name, description, price, ingredients, null);

    return res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message })
  }
})


router.post("/", async (req, res) => {
  try {
    const { name, description, price, ingredients } = req.body;
    const product = await create(name, description, price, ingredients, req.user);

    return res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, price, ingredients } = req.body;
    const product = await update(id, name, description, price, ingredients, req.user);

    return res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await deleteById(id, req.user);

    return res.status(200).json({ message: "Product deleted succussfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message })
  }
})

export default router;