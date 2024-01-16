import { Order } from "../models/Order";
import { Product } from "../models/Product";


export const getUserOrders = async (user, ipAddress) => {
  let orders = [];

  if (user && user.role === "admin") {
    return await Order.find({});
  } else if (user?.id) {
    return await Order.find({ userId: user.id });
  }
  return await Order.find({ ipAddress: ipAddress });
}

export const getOrder = async (id, user) => {
  const order = await Order.findById(id);
  if (!order) {
    throw new Error("Order not found");
  }
  if (user && user.role === "admin") {
    return order;
  }
  if (user.id !== order?.userId) {
    throw new Error("Forbidden - You do not have the necessary permissions")
  }

  return order;
}

export const create = async (order, user, ipAddress) => {
  const { displayName, products } = order;
  if (!displayName || !products || !products?.length) {
    throw Error("All fields are required");
  }
  const customProducts = [];
  let total = 0;
  for (const orderProduct of products) {
    if (!orderProduct.id) {
      continue;
    }
    const product = await Product.findById(orderProduct.id);
    if (product) {
      total += product.price;
      let ingredients = orderProduct?.ingredients;
      if (ingredients.length === 0) {
        ingredients = product.ingredients
      }
      let customIngredients = ingredients?.map(({ name, description, value }) => {
        return {
          name,
          description,
          value,
        }
      });
      customProducts.push({
        name: product.name,
        description: product.description,
        price: product.price,
        ingredients: customIngredients
      });
    }
  }
  if (customProducts.length === 0) {
    throw new Error("Please add products to order");
  }
  const orderDb = await Order.create({
    displayName,
    ipAddress,
    userId: user?.id || null,
    total,
    products: customProducts
  });

  return orderDb;
}

export const deleteById = async (id, user) => {
  if (!id) {
    throw new Error("Id is required");
  }
  const orderDb = await Order.findById(id);
  if (!orderDb) {
    throw new Error("Order not found");
  }
  if (orderDb.userId !== user.id && user.role !== "admin") {
    throw new Error("Forbidden - You do not have the necessary permissions");
  }

  await Order.findByIdAndDelete(id);
}