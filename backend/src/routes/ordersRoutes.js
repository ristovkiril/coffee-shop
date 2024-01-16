import express from "express";
import { create, deleteById, getOrder, getUserOrders } from "../service/orderService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const orders = await getUserOrders(req.user, req.ipAddress);

    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getOrder(id, req.user);

    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

router.post("/", async (req, res) => {
  try {
    const { displayName, products } = req.body;
    const order = await create(displayName, products, req.user, req.ipAddress);

    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await deleteById(id, req.user);

    return res.status(200).json({ message: "Product deleted succussfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

export default router;