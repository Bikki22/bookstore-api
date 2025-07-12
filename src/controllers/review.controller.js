import { Review } from "../models/review.models";
import { ApiError } from "../utils/api-error";
import { ApiResponse } from "../utils/api-response";
import { asyncHandler } from "../utils/async-handler";

const createReviews = asyncHandler(async (req, res) => {
  const { review } = req.body;

  const newReview = await Review.create({ review });

  if (!newReview) {
    throw new ApiError(400, "review not defined");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, newReview, "Review added successfully"));
});

const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedReview = await Review.findByIdAndDelete(id);

  if (!deletedReview) {
    throw new ApiError(404, "Review not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deleteReview, "Review deleted successfully"));
});

const getReviews = asyncHandler(async (req, res) => {
  const allReviews = await Review.find();

  if (!allReviews) {
    throw new ApiError(404, "Reviews not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, allReviews, "all reviews fetched successfully"));
});

export { createReviews, deleteReview, getReviews };
