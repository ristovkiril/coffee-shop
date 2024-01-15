import { Product } from "../models/Product.js";
import { Ingredient } from "../models/Ingredient.js";

export const findById = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
}

export const findAll = async (owner) => {
  const products = await Product.find({ owner: owner });
  if (!products) {
    throw new Error("Product not found");
  }
  return products;
}

export const create = async (name, description, price, ingredients, user) => {
  if (!name || !description || !price || !ingredients || ingredients.length === 0) {
    throw new Error("Name, description, price and ingredients are required fields");
  }

  const mappedIngredients = await mapIngredients(ingredients);

  const product = await Product.create({
    name,
    description,
    price,
    owner: user?.id || null,
    ingredients: mappedIngredients
  })

  return product;
}

export const update = async (id, name, description, price, ingredients) => {
  if (!id || !name || !description || !price || !ingredients || ingredients.length === 0) {
    throw new Error("Name, description, price and ingredients are required fields");
  }

  const mappedIngredients = await mapIngredients(ingredients);

  const product = await Product.findByIdAndUpdate(id, {
    name,
    description,
    price,
    ingredients: mappedIngredients
  })

  return { ...product, name, description, price, ingredients };
}

export const deleteById = async (id) => {
  if (!id) {
    throw new Error("Id is required");
  }
  await Product.findByIdAndDelete(id);
}

const mapIngredients = async (ingredients) => {
  const mapped = [];
  for (const ingredient of ingredients) {
    if (!ingredient.id) {
      throw new Error("Ingredient value is required");
    }
    if (ingredient.min === undefined || ingredient.min < 0) {
      throw new Error("Min value cant be below 0");
    }
    if (ingredient.value === undefined || ingredient.value < ingredient.min) {
      throw new Error("Default value is required");
    }
    if (ingredient.value > ingredient.max) {
      throw new Error("Default value must be below or equals max value");
    }
    const dbIngredient = await Ingredient.findById(ingredient.id);
    ingredient.name = dbIngredient.name;
    ingredient.description = dbIngredient.description;
    mapped.push(ingredient);
  }
  return mapped;
}