import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    ingredients: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ingredient",
        },
        name: { type: String, required: true },
        description: { type: String, required: true },
        value: { type: Number, required: true },
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