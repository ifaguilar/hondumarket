import { Router } from "express";
import { changeComplaintStatus, getComplaints, getComplaintsCategories } from "../controllers/complaintsController.js";

const router = Router();

// Routes
router.get("/all", getComplaints);
router.get("/categories", getComplaintsCategories);
router.post("/changeComplaintStatus", changeComplaintStatus);

export default router;
