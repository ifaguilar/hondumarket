import { Router } from "express";

// Middleware
import authorizeUser from "../middleware/authMiddleware.js";
import {
  validateSignin,
  validateSignup,
} from "../middleware/validationMiddleware.js";

// Controllers
import {
  signinUser,
  signupUser,
  verifyUser,
} from "../controllers/authController.js";

const router = Router();

// Routes
router.post("/signin", validateSignin, signinUser);
router.post("/signup", validateSignup, signupUser);
router.get("/verify", authorizeUser, verifyUser);

export default router;
