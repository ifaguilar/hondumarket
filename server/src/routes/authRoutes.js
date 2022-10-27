import { Router } from "express";
import * as authController from "../controllers/authController.js";

const router = Router();

router.get("/login", authController.login);

router.get("/signup", authController.signup);

export default router;
