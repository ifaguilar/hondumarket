import { Router } from "express";

// Controllers
import { getConditions } from "../controllers/conditionController.js";

const router = Router();

// Routes
router.get("/", getConditions);

export default router;
