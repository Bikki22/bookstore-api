import { Cart } from "../models/cart.models";
import { ApiError } from "../utils/api-error";
import { ApiResponse } from "../utils/api-response";
import { asyncHandler } from "../utils/async-handler";

const getUserCart = asyncHandler(async (req, res) => {
  const { userId } = req.user._id;

  const cart = await Cart.findOne({ owner: userId }).populate("items.booksId");

  if (!cart) {
    return res.status(200).json({ items: [], message: "Cart is empty" });
  }

  res
    .status(200)
    .json(new ApiResponse(200, cart, "user  cart fetched successfully"));
});

const addItemOrUpdateItemQuantity = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { booksId, quantity } = req.body;

  let cart = await Cart.findOne({ owner: userId });

  if (!cart) {
    // Create a new cart if not exists
    cart = new Cart({ owner: userId, items: [] });
  }

  const existingItem = cart.items.find(
    (item) => item.booksId.toString() === booksId,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ booksId, quantity });
  }

  await cart.save();
  res.status(200).json(new ApiResponse(200, cart, "item added successfully"));
});
const removeItemFromCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { booksId } = req.body;

  const cart = await Cart.findOne({ owner: userId });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.items = cart.items.filter((item) => item.booksId.toString() !== booksId);

  await cart.save();
  res.status(200).json(new ApiResponse(200, cart, "item removed from cart"));
});
const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ owner: userId });

  if (!cart) {
    throw new ApiError(404, "Cart doesnot found");
  }

  cart.items = [];
  await cart.save();

  res.status(200).json(new ApiResponse(200, cart, "cart cleared successfully"));
});

export {
  getUserCart,
  addItemOrUpdateItemQuantity,
  removeItemFromCart,
  clearCart,
};
