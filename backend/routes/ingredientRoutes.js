import express from "express";
import { findById, findAll, create, update, deleteById } from "../service/ingredientService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const ingredients = await findAll();

    return res.status(200).json(ingredients);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const ingredient = await findById(id);

    return res.status(200).json(ingredient);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message })
  }
})

router.post("/", async (req, res) => {
  try {
    const { name, description, min, max } = req.body;
    const ingredient = await create(name, description, min, max);

    return res.status(200).json(ingredient);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, min, max } = req.body;

    const ingredient = await update(id, name, description, min, max);

    return res.status(200).json(ingredient);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await deleteById(id);

    return res.status(200).json({ message: "Ingredient deleted succussfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message })
  }
})

export default router;