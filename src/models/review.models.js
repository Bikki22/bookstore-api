import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    booksId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
    },
  },
  { timestamps: true },
);

export const Review = mongoose.model("Review", reviewSchema);
