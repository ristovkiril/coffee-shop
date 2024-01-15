import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    owner: { type: String, required: false },
    ingredients: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ingredient",
        },
        name: { type: String, required: true },
        description: { type: String, required: true },
        value: { type: Number, required: true },
        min: { type: Number, required: true, default: 0 },
        max: { type: Number, required: true, default: 5 },
      },
    ]
  },
  {
    collection: 'product-data', timestamps: true,
    id: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
      }
    }
  }
)

export const Product = mongoose.model('Product', ProductSchema)