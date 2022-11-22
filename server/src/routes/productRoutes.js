import { Router } from "express";

// Controllers
import {
  deactivateProduct,
  getPhotos,
  getProduct,
  getProducts,
  getSeller,
} from "../controllers/productController.js";

const router = Router();

// Routes
router.get("/", getProducts);
router.get("/:id", getProduct);
router.patch("/:id", deactivateProduct);
router.get("/:id/photos", getPhotos);
router.get("/:id/seller", getSeller);

export default router;
