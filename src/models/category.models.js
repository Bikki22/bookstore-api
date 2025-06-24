import mongoose from "mongoose";

const categorySchema = new mongoose.model(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timeStamps: true },
);

export const Category = mongoose.model("Category", categorySchema);
