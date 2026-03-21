import { Router } from "express";
const router = Router();

import { getSummary } from "../controller/analyticsController.js";
import {protectedRoute} from "../middleware/authMiddleware.js"

router.get("/summary", protectedRoute, getSummary);

export default router;
