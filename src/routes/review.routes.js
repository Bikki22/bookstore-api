import express, { Router } from "express";

const router = Router();

router.route("/books/:id/reviews").post(createReviews);
router.route("/books/:id/reviews").get(getReviews);
router.route("/books/:id").delete(deleteReviews); //owner only

export default router;
