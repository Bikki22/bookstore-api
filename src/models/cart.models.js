import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: {
      type: [
        {
          booksId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Books",
          },
          quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity cannot be less than 1"],
            default: 1,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

export const Cart = mongoose.model("Cart", cartSchema);
