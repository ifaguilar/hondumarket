import { Router } from "express";

// Controllers
import { getCategories } from "../controllers/categoryController.js";

const router = Router();

// Routes
router.get("/", getCategories);

export default router;
