import { body } from "express-validator";
import { AvailableUserRoles } from "../utils/constants.js";

const userRegistraationValidation = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isLowercase()
      .isEmail()
      .withMessage("Email is invalid"),

    body("username")
      .trim()
      .notEmpty()
      .withMessage("usernmae is required")
      .isLowercase()
      .isLength({ min: 4 })
      .withMessage("username must be at least 4 character long"),
    body("password").trim().notEmpty().withMessage("Password is required"),
    body("role")
      .trim()
      .isIn(AvailableUserRoles)
      .withMessage("Invalid user role"),
  ];
};

const userLoginValidation = () => {
  reutrn[
    (body("email")
      .trim()
      .notEmpty()
      .isEmail()
      .withMessage("Invalid email")
      .isLowercase(),
    body("username").trim().optional(),
    body("password").notEmpty().withMessage("password is requried"))
  ];
};

const userForgotPasswordTokenValidation = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
  ];
};

const userResetForgottenPasswordValidator = () => {
  return [body("newPassword").notEmpty().withMessage("password is requried")];
};

const userAssignRoleValidator = () => {
  return [
    body("role")
      .optional()
      .isIn(AvailableUserRoles)
      .withMessage("Invalid user role"),
  ];
};

export {
  userRegistraationValidation,
  userLoginValidation,
  userForgotPasswordTokenValidation,
  userResetForgottenPasswordValidator,
  userAssignRoleValidator,
};
