import { Router } from "express";

// Controllers
import {
  getCategories,
  getTopProducts,
} from "../controllers/categoryController.js";

const router = Router();

// Routes
router.get("/", getCategories);
router.get("/:id/top", getTopProducts);

export default router;
