import { Router } from "express";

// Controllers
import {
  getCategories,
  getCategoriesDashboard,
  getTopProducts,
  updateCategory,
} from "../controllers/categoryController.js";

const router = Router();

// Routes
router.get("/", getCategories);
router.get("/dashboard", getCategoriesDashboard);
router.patch("/:id", updateCategory);
router.get("/:id/top", getTopProducts);

export default router;
