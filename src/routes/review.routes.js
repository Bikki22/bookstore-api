import { Router } from "express";

const router = Router();

router.route("/:id/reviews").post(createReviews);
router.route("/:id/reviews").get(getReviews);
router.route("/:id").delete(deleteReviews);

export default router;
