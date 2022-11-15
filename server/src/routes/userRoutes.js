import { Router } from "express";

// Controllers
import {
  addToWishlist,
  getProducts,
  getWishlist,
  getWishlistProducts,
  removeFromWishlist,
} from "../controllers/userController.js";

const router = Router();

// Routes
router.get("/:id/products", getProducts);
router.get("/:id/wishlist", getWishlist);
router.get("/:id/wishlist/products", getWishlistProducts);
router.post("/:id/wishlist", addToWishlist);
router.delete("/:id/wishlist", removeFromWishlist);

export default router;
