import { Ingredient } from "../models/Ingredient.js";

export const findById = async (id) => {
  const ingredient = await Ingredient.findById(id);
  if (!ingredient) {
    throw new Error("Ingredient not found");
  }
  return ingredient;
}

export const findAll = async () => {
  const ingredients = await Ingredient.find({});
  if (!ingredients) {
    throw new Error("Ingredient not found");
  }
  return ingredients;
}

export const create = async (name, description) => {
  if (!name || !description) {
    throw new Error("Name and description are required fields");
  }
  const ingredient = await Ingredient.create({
    name,
    description
  })

  return ingredient;
}

export const update = async (id, name, description) => {
  if (!name || !description || !id) {
    throw new Error("Name and description are required fields");
  }
  const ingredient = await Ingredient.findByIdAndUpdate(id, {
    name,
    description
  })

  return { ...ingredient, name, description };
}

export const deleteById = async (id) => {
  if (!id) {
    throw new Error("Id is required");
  }
  await Ingredient.findByIdAndDelete(id);
}
