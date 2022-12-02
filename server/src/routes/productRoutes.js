import { Router } from "express";

// Controllers
import {
  deactivateProduct,
  getPhotos,
  getProduct,
  getProducts,
  getProductsDashboard,
  getSeller,
  updateProduct,
} from "../controllers/productController.js";

const router = Router();

// Routes
router.get("/", getProducts);
router.get("/dashboard", getProductsDashboard);
router.patch("/deactivate/:id", deactivateProduct);
router.get("/:id", getProduct);
router.patch("/:id", updateProduct);
router.get("/:id/seller", getSeller);
router.get("/:id/photos", getPhotos);

export default router;
