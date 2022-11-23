import { Router } from "express";

// Controllers
import {
  addToWishlist,
  addUserComplaint,
  addUserRating,
  getAverageUserRating,
  getProducts,
  getUsers,
  getWishlist,
  getWishlistProducts,
  removeFromWishlist,
} from "../controllers/userController.js";

const router = Router();

// Routes
router.get("/", getUsers);
router.get("/:id/products", getProducts);
router.get("/:id/wishlist", getWishlist);
router.get("/:id/wishlist/products", getWishlistProducts);
router.post("/:id/wishlist", addToWishlist);
router.delete("/:id/wishlist", removeFromWishlist);

//Routes para el rating
router.get("/:id/rating/seller",getAverageUserRating);
// router.get("/:id/rating",  getUserRating)
router.post("/rate",  addUserRating)
router.post("/complaint",  addUserComplaint)

export default router;
