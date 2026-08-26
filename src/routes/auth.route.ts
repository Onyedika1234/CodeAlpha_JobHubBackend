import express, { Router } from "express";
import { Login, Logout, signUp } from "../controllers/auth.controller.ts";
import {
  validateLogin,
  validateSignUp,
} from "../middlewares/validate.middleware.ts";
import { authLimit } from "../utils/ratelimit.ts";
// import { authorize } from "../middlewares/auth.middleware.ts";
// import prisma from "../utils/prisma.ts";

const authRouter: Router = express.Router();

//Register new User
authRouter.post("/sign-up", authLimit, validateSignUp, signUp);

//login
authRouter.post("/login", authLimit, validateLogin, Login);

//Logout
authRouter.post("/logout", authLimit, Logout);

export default authRouter;
