import express from "express";
import {
  getMe,
  login,
  logout,
  registerUser,
} from "../controller/authController.js";
import { protectedRoute } from "../middleware/authMiddleware.js";
const AuthRouter = express.Router();

AuthRouter.post("/signup", registerUser);
AuthRouter.post("/login", login);
AuthRouter.get("/getme", protectedRoute, getMe);
AuthRouter.post("/logout", logout);

export default AuthRouter;
