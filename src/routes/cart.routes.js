import express from "express";

const router = express.Router();

router.route("/").get(getUserCart);

router.route("/clear").delete(deleteCart);

router
  .route("/books/:id")
  .post(addOrUpdateBooksQuantity)
  .delete(removeBooksFromCart);

export default router;
