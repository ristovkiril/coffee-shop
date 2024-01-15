import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    min: { type: Number, required: true, default: 0 },
    max: { type: Number, required: true, default: 5 },
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