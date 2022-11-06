import { Router } from "express";

// Controllers
import {
  getDepartments,
  getMunicipalities,
} from "../controllers/departmentController.js";

const router = Router();

// Routes
router.get("/", getDepartments);
router.get("/municipalities/:id", getMunicipalities);

export default router;
