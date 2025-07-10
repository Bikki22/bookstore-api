import { Order } from "../models/order.models";
import { ApiError } from "../utils/api-error";
import { asyncHandler } from "../utils/async-handler";
import { AvailableOrderStatus, OrderStatusEnum } from "../utils/constants";
import mongoose from "mongoose";

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  let order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order doesnot exists");
  }

  if (order.status === OrderStatusEnum.DELIVERED) {
    throw new ApiError(400, "Ordered is already delivered");
  }

  order = await Order.findByIdAndUpdate(
    orderId,
    {
      $set: {
        status,
      },
    },
    {
      new: true,
    },
  );
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        status,
      },
      "Order status changed successfully",
    ),
  );
});

const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.aggregate([
    // 1. Match the order by its ID
    {
      $match: {
        _id: new mongoose.Types.ObjectId(orderId),
      },
    },

    // 2. Lookup customer details from users collection
    {
      $lookup: {
        from: "users",
        localField: "customer",
        foreignField: "_id",
        as: "customer",
        pipeline: [
          {
            $project: {
              _id: 1,
              username: 1,
              email: 1,
            },
          },
        ],
      },
    },

    // 3. Flatten customer array to single object
    {
      $addFields: {
        customer: { $first: "$customer" },
      },
    },

    // 4. Unwind items array to lookup books
    { $unwind: "$items" },

    // 5. Lookup book details from books collection
    {
      $lookup: {
        from: "books",
        localField: "items.booksId",
        foreignField: "_id",
        as: "items.book",
      },
    },

    // 6. Flatten book array to object
    {
      $addFields: {
        "items.book": { $first: "$items.book" },
      },
    },

    // 7. Group back the order and collect all items
    {
      $group: {
        _id: "$_id",
        order: { $first: "$$ROOT" },
        orderItems: {
          $push: {
            _id: "$items._id",
            quantity: "$items.quantity",
            book: "$items.book",
          },
        },
      },
    },

    // 8. Reassign enriched items into order object
    {
      $addFields: {
        "order.items": "$orderItems",
      },
    },

    // 9. Remove temporary `orderItems` array
    {
      $project: {
        orderItems: 0,
      },
    },
  ]);

  if (!order[0]) {
    throw new ApiError(404, "Order does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order[0], "Order fetched successfully"));
});

const getOrderListAdmin = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;

  const orderAggrigate = await Order.aggregate([
    {
      $match:
        status && AvailableOrderStatus.includes(status.toUpperCase())
          ? {
              status: status.toUpperCase(),
            }
          : {},
    },
    {
      $lookup: {
        from: "users",
        localField: "customer",
        foreignField: "_id",
        as: "customer",
        pipeline: [
          {
            $project: {
              _id: 1,
              username: 1,
              email: 1,
            },
          },
        ],
      },
    },

    {
      $addFields: {
        customer: { $first: "$customer" },
        totalOrderItem: {
          $size: "items",
        },
      },
    },
    {
      $project: {
        items: 0,
      },
    },
  ]);

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };

  const orders = await Order.aggregatePaginate(orderAggrigate, options);

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders fetched successfully"));
});

export { updateOrderStatus, getOrderById, getOrderListAdmin };
