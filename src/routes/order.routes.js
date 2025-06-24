import express from "express";

const router = express.Router();

router.route("/").post(placeOrder);
router.route("/list/admin").get(getAllUserOrders);
router.route("/:id").get(orderDetails);
router.route("/status/:id").patch(updateOrderStatus);

export default router;
