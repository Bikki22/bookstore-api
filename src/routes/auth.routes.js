import express from "express";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/verify-email/:verificationToken").get(verifyEmail);
router.route("/resend-email-verification").post(resendVerificationEmail);
router.route("/assign-role/:userId").post(assignRole);
router.route("/me").get(getProfile);

export default router;
