import { Router } from "express";
const router = Router();
import { createTrade, fetchTrades } from "../controller/tradeController.js";
import { protectedRoute } from "../middleware/authMiddleware.js";

router.post("/create", protectedRoute, createTrade);
router.get("/", protectedRoute, fetchTrades);

export default router;
