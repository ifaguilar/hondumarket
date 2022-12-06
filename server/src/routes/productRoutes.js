import { Router } from "express";

// Controllers
import {
  addView,
  deactivateProduct,
  getPhotos,
  getProduct,
  getProducts,
  getProductsDashboard,
  getSeller,
  updateProduct,
  createProduct,
} from "../controllers/productController.js";

const router = Router();

// Routes
router.get("/", getProducts);
router.post("/", createProduct);
router.get("/dashboard", getProductsDashboard);
router.patch("/deactivate/:id", deactivateProduct);
router.get("/:id", getProduct);
router.patch("/:id", addView);
router.patch("/:id/update", updateProduct);
router.get("/:id/seller", getSeller);
router.get("/:id/photos", getPhotos);

export default router;
