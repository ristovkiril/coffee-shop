import express from "express";
import { login, register } from "../service/authService.js";

const router = express.Router();

router.post("/me", (req, res) => {
  if (req.user) {
    return res.status(200).json({ id: req.user.id, name: req.user.name, email: req.user.email, role: req.user.role });
  }
  return res.status(500).json({ message: "Not authorized" });
})

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await register(name, email, password);
    return res.status(200).json({ message: 'Succussfully created' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message })
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await login(email, password);

    return res.status(200).json({ ...data });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message })
  }
})

export default router;