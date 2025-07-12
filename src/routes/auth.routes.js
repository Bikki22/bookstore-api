import express from "express";
import {
  verifyJWT,
  verifyPermission,
} from "../middlewares/auth.middlewares.js";
import {
  userAssignRoleValidator,
  userForgotPasswordTokenValidation,
  userLoginValidation,
  userRegistraationValidation,
  userResetForgottenPasswordValidator,
} from "../validators/user.validators.js";
import {
  assignRole,
  changeCurrentPassword,
  forgotPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  resendVerificationEmail,
  resetForgottenPassword,
  verifyEmail,
} from "../controllers/user.controllers.js";
import { UserRolesEnum } from "../utils/constants.js";

const router = express.Router();

router
  .route("/register")
  .post(userRegistraationValidation(), verifyJWT, registerUser);
router.route("/login").post(userLoginValidation(), loginUser);
router.route("refresh-token").post(refreshAccessToken);
router.route("/logout").post(logoutUser);
router.route("/verify-email").post(verifyEmail);
router
  .route("/forgot-password")
  .post(userForgotPasswordTokenValidation(), forgotPassword);
router.route("/resend-verificaton-email").post(resendVerificationEmail);
router
  .route("/reset-password/:resetToken")
  .post(userResetForgottenPasswordValidator(), resetForgottenPassword);
router.route("/current-user").post(verifyJWT, getCurrentUser);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router
  .route("/assign-role/:userId")
  .post(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN]),
    userAssignRoleValidator(),
    assignRole,
  );

export default router;
