import express from "express";
import { preTradeCheck } from "../controller/preTradeController.js";
import { protectedRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/check", protectedRoute, preTradeCheck);

export default router;
