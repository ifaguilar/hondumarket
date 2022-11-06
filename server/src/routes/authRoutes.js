import { Router } from "express";

// Middleware
import {
  validateForgotPassword,
  validateSignin,
  validateSignup,
} from "../middleware/validationMiddleware.js";

// Controllers
import {
  forgotPassword,
  resetPassword,
  signinUser,
  signupUser,
} from "../controllers/authController.js";

const router = Router();

// Routes
router.post("/signin", validateSignin, signinUser);
router.post("/signup", validateSignup, signupUser);
router.post("/forgot-password", validateForgotPassword, forgotPassword);
router.patch("/reset-password", resetPassword);

export default router;
