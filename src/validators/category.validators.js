import { body } from "express-validator";

const categoryValidator = () => {
  return [
    body("name").trim().notEmpty().withMessage("Cateogry name is required"),
  ];
};

return {
  categoryValidator,
};
