import { Router } from "express";

// Controllers
import { getProducts } from "../controllers/productController.js";

const router = Router();

// Routes
router.get("/", getProducts);

export default router;
