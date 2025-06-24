import express, { Router } from "express";

const router = Router();

router.route("/books").get(getAllBooks);
router.route("/books").post(createBooks);
router.route("/books/:id").get(getBooksById);
router.route("/books/:id").put(updateBook);
router.route("/books/:id").delete(deleteBook);

export default router;
