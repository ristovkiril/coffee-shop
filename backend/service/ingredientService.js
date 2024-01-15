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

export const create = async (name, description, min, max) => {
  if (!name || !description || !isFinite(min) || min < 0 || !isFinite(max) || max <= min) {
    throw new Error("Invalid data");
  }
  const ingredient = await Ingredient.create({
    name,
    description,
    min,
    max
  })

  return ingredient;
}

export const update = async (id, name, description, min, max) => {
  if (!name || !description || !id || !isFinite(min) || min < 0 || !isFinite(max) || max <= min) {
    throw new Error("Invalid data");
  }
  const ingredient = await Ingredient.findByIdAndUpdate(id, {
    name,
    description,
    min,
    max
  })

  return { ...ingredient, name, description, min, max };
}

export const deleteById = async (id) => {
  if (!id) {
    throw new Error("Id is required");
  }
  await Ingredient.findByIdAndDelete(id);
}
