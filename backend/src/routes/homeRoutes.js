import express from "express"
import { protectedRoute } from "../middleware/authMiddleware.js";
import { getHomeDashboard } from "../controller/homeController.js";
const router = express.Router();

router.get("/", protectedRoute, getHomeDashboard);

export default router;