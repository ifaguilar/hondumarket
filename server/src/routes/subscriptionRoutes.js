import { Router } from "express";

// Controllers
import {
  getSubscriptions,
  subscribeToCategory,
  unsubscribeFromCategory,
} from "../controllers/subscriptionController.js";

const router = Router();

// Routes
router.get("/:id", getSubscriptions);
router.post("/", subscribeToCategory);
router.delete("/unsubscribe", unsubscribeFromCategory);

export default router;
