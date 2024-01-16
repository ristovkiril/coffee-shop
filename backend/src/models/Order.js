import mongoose from "mongoose";

const OrderProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    ingredients: [
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
        value: { type: Number, required: true },
      },
    ],
  },
  {
    _id: false,
  }
);

const OrderSchema = new mongoose.Schema(
  {
    products: [OrderProductSchema],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserData"
    },
    ipAddress: String,
    displayName: String,
    total: { type: Number, required: true }
  },
  {
    collection: "order-data",
    timestamps: true,
    id: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

export const Order = mongoose.model("Order", OrderSchema);
