import { body } from "express-validator";

const createBookValidator = ()=>{
    return [
        body("name").trim().notEmpty().withMessage("title is requried"),
        body("description").trim().notEmpty().withMessage("Description is required"),
        body("price").trim().notEmpty().withMessage("price is required").isNumeric().withMessage("price must be a number"),
        body("stock").trim().optional().notEmpty().withMessage("stock is required").isNumeric().withMessage("Stock must be a number")
    ]
}

const updateBookValidator = ()=>{
    return [
        body("title").trim().optional().notEmpty().withMessage("title is required"),
        body("description").trim().optional().notEmpty().withMessage("description is required"),
        body("price").trim().optional().notEmpty().withMessage("price is requried").isNumeric().withMessage("price must be a number"),
        body("stock").trim().optional().notEmpty().withMessage("stock is required").isNumeric().withMessage("stock must be a number")
    ]
}

export {createBookValidator, updateBookValidator}