import express from "express";
import {
  getMe,
  login,
  logout,
  registerUser,
  updateProfile,
} from "../controller/authController.js";
import { protectedRoute } from "../middleware/authMiddleware.js";
const AuthRouter = express.Router();

AuthRouter.post("/signup", registerUser);
AuthRouter.post("/login", login);
AuthRouter.get("/getme", protectedRoute, getMe);
AuthRouter.post("/logout", logout);
AuthRouter.patch("/update", protectedRoute, updateProfile)

export default AuthRouter;
