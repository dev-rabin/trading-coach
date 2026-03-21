import { Router } from "express";
const router = Router();
import { createTrade } from "../controller/tradeController.js";
import { protectedRoute } from "../middleware/authMiddleware.js";

router.post("/create",protectedRoute, createTrade);

export default router;
