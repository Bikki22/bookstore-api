import express from "express";
import {
  updateOrderStatus,
  getOrderById,
  getOrderListAdmin,
} from "../controllers/order.controllers.js";

const router = express.Router();

router.route("/admin").get(getOrderListAdmin);
router.route("/:id").get(getOrderById);
router.route("/:id").patch(updateOrderStatus);

export default router;
