import express from "express";
import {
  getUserCart,
  addItemOrUpdateItemQuantity,
  removeItemFromCart,
  clearCart,
} from "../controllers/cart.controllers.js";

const router = express.Router();

router.route("/").get(getUserCart);

router.route("/:id").delete(clearCart);

router
  .route("/:id")
  .post(addItemOrUpdateItemQuantity)
  .delete(removeItemFromCart);

export default router;
