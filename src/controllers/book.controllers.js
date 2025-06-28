import { Books } from "../models/book.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import Category from "../models/category.models.js";
import mongoose from "mongoose";

const getAllBooks = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const bookAggrigate = Books.aggregate([{ $match: {} }]);

  const books = Books.aggregatePaginate(bookAggrigate);

  return res
    .status(200)
    .json(new ApiResponse(200, books, "books fetched successfully"));
});

const createBooks = asyncHandler(async (req, res) => {
  const { title, description, author, price, category, stock } = req.body;

  if (!req.files?.mainImage || !req.files?.mainImage.length) {
    throw new ApiError(404, "Main image is required");
  }

  const owner = req.user._id;

  const book = await Books.create({
    title,
    description,
    author,
    price,
    category,
    stock,
    owner,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, book, "book created successfully"));
});

const updateBook = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const { title, description, category, price, stock, author } = req.body;

  const book = await Books.findById(bookId);

  if (!book) {
    throw new ApiError(404, "book doesnot exists");
  }

  const updatedBook = await Books.findByIdAndUpdate(
    bookId,
    {
      $set: {
        title,
        description,
        stock,
        price,
        category,
        mainImage,
        subImages,
      },
    },
    {
      new: true,
    },
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedBook, "Book updated successfully"));
});

const getBooksById = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const book = await Books.findById(bookId);

  if (!book) {
    throw new ApiError(404, "Book doesnot exists");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, book, "    book fetched successfully"));
});

const getBookByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const category = await Category.findById(categoryId).select("name _id");

  if (!category) {
    throw new ApiError(404, "Category doesnot exists");
  }

  const bookAggrigate = await Books.aggregate([
    {
      $match: {
        category: new mongoose.Types.ObjectId(categoryId),
      },
    },
  ]);

  const books = await Books.aggregatePaginate(bookAggrigate);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { ...books, category },
        "category product fetched succssfully",
      ),
    );
});

const deleteBook = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  const book = await Books.findByIdAndDelete({ _id: bookId });

  if (!book) {
    throw new ApiError(404, "book doesnot exists");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { deletedProduct: book },
        "Book delelted successfully",
      ),
    );
});

export {
  getAllBooks,
  getBooksById,
  getBookByCategory,
  createBooks,
  updateBook,
  deleteBook,
};
