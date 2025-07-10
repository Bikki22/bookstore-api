import { Category } from "../models/category.models";
import { ApiError } from "../utils/api-error";
import { ApiResponse } from "../utils/api-response";
import { asyncHandler } from "../utils/async-handler";

const createCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;

  const category = await Category.create({ title, owner: req.user._id });

  return res
    .status(201)
    .json(new ApiResponse(200, category, "category created successfully"));
});

const getAllCategory = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const categoryAggregate = Category.aggregate([
    { $match: {} }, // match all categories
  ]);

  const options = {
    page: Number(page),
    limit: Number(limit),
  };

  const categories = await Category.aggregatePaginate(
    categoryAggregate,
    options,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories fetched successfully"));
});

const getCategoryById = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(404, "Category doesnot exists");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category fetched successfully"));
});

const updateCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;

  const category = await Category.findByIdAndUpdate(
    categoryId,
    {
      $set: {
        name,
      },
    },
    {
      new: true,
    },
  );

  if (!category) {
    throw new ApiError(404, "category doesnot exists");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category updated successfully"));
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const category = await Category.findByIdAndDelete(categoryId);
  if (!category) {
    throw new ApiError(404, "category doesnot exists");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { deletedCategory: category },
        "category deleted successfuylly",
      ),
    );
});

export {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
