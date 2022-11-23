import { Router } from "express";

// Controllers
import {
  getSubscriptions,
  // getSubscriptionsProducts,
  subscribeToCategory,
  unsubscribeFromCategory,
} from "../controllers/subscriptionController.js";

const router = Router();

// Routes
router.post("/", subscribeToCategory);
router.get("/:id", getSubscriptions);
router.delete("/unsubscribe", unsubscribeFromCategory);

export default router;
