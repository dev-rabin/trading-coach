import express from "express";
import { login, registerUser } from "../controller/authController.js";
const AuthRouter = express.Router();

AuthRouter.post("/register", registerUser);
AuthRouter.post("/login", login);

export default AuthRouter;
