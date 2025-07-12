import express, { Router } from "express";
import {
  getAllBooks,
  getBooksById,
  getBookByCategory,
  createBooks,
  updateBook,
  deleteBook,
} from "../controllers/book.controllers.js";
import {
  verifyJWT,
  verifyPermission,
} from "../middlewares/auth.middlewares.js";
import { UserRolesEnum } from "../utils/constants.js";
import { createBookValidator } from "../validators/book.validators.js";

const router = Router();

router.route("/").get(getAllBooks);
router
  .route("/")
  .post(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN]),
    createBookValidator(),
    createBooks,
  );
router.route("/:id").get(getBooksById);
router.route("/category").get(getBookByCategory);
router
  .route("/:id")
  .put(verifyJWT, verifyPermission([UserRolesEnum.ADMIN]), updateBook)
  .delete(verifyJWT, verifyPermission([UserRolesEnum.ADMIN]), deleteBook);

export default router;
