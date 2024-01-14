import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    collection: 'ingredient-data', timestamps: true,
    id: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
      }
    }
  }
)

export const Ingredient = mongoose.model('Ingredient', IngredientSchema)