import mongoose from "mongoose";
import { AvailableUserRoles, OrderStatusEnum } from "../utils/constants";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const orderSchema = new mongoose.Schema(
  {
    orderPrice: {
      type: Number,
      required: true,
    },
    discountOrderPrice: {
      type: Number,
      required: true,
    },
    customer: {
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
            min: [1, "Quantity cannnot be less than 1"],
            default: 1,
          },
        },
      ],
      default: [],
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: AvailableUserRoles,
      default: OrderStatusEnum.PENDING,
    },
  },
  { timestamps: true },
);

orderSchema.plugin(mongooseAggregatePaginate);

export const Order = mongoose.model("Order", orderSchema);
