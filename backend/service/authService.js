import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { ROLE } from "../configs/global.config.js";
import bcrypt from "bcryptjs";

export const login = async (email, password) => {
  const user = await User.findOne({
    email: email,
  })

  if (!user) {
    throw new Error('Bad credentials');
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  )

  if (!isPasswordValid) {
    throw new Error('Bad credentials');
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    process.env.SECRET
  )

  return { token: token, user: { id: user.id, name: user.name, email: user.email, role: user.role } }
}

export const register = async (name, email, password) => {
  const newPassword = await bcrypt.hash(password, 10)
  await User.create({
    name: name,
    email: email,
    password: newPassword,
    role: ROLE.USER
  })
}