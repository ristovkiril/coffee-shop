import express from "express";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { ROLE } from "../configs/global.config.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/me", (req, res) => {
  //TODO return auth user from jwt token
  if (req.user) {
    return res.status(200).json({ name: req.user.name, email: req.user.email, role: req.user.role });
  }
  return res.status(500).json({ message: "Not authorized" });
})

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newPassword = await bcrypt.hash(password, 10)
    await User.create({
      name: name,
      email: email,
      password: newPassword,
      role: ROLE.USER
    })
    res.json({ status: 'ok' })
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message })
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email,
    })

    if (!user) {
      return res.status(500).json({ status: 'error', error: 'Bad credentials' })
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    )
    if (isPasswordValid) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
          role: user.role
        },
        process.env.SECRET
      )

      return res.status(200).json({ token: token, user: { name: user.name, email: user.email, role: user.role } })
    } else {
      return res.status(500).json({ error: 'Bad credentials' })
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message })
  }
})

export default router;