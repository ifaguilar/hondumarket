import { Router } from "express";

// Controllers
import {
  getPhotos,
  getProduct,
  getProducts,
  getSeller,
} from "../controllers/productController.js";

const router = Router();

// Routes
router.get("/", getProducts);
router.get("/:id", getProduct);
router.get("/:id/photos", getPhotos);
router.get("/:id/seller", getSeller);

export default router;
