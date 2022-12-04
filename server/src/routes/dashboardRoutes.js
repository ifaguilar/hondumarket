import { Router } from "express";

// Controllers
import {
  countCategories,
  countComplaints,
  countProducts,
  countUsers,
  getProductsByCategory,
  getProductsByCondition,
  getUsersByDepartment,
  getUsersByMonth,
} from "../controllers/dashboardController.js";

const router = Router();

// Routes
router.get("/users", countUsers);
router.get("/usersByDepartment", getUsersByDepartment);
router.get("/usersByMonth", getUsersByMonth);
router.get("/products", countProducts);
router.get("/productsByCategory", getProductsByCategory);
router.get("/productsByCondition", getProductsByCondition);
router.get("/categories", countCategories);
router.get("/complaints", countComplaints);

export default router;
