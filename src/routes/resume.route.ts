import express from "express";
import upload from "../middlewares/upload.middleware.ts";
import { uploadResume } from "../controllers/resume.controller.ts";
import { authorize } from "../middlewares/auth.middleware.ts";

const resumeRoute = express.Router();

resumeRoute.post("/", authorize, upload.single("resume"), uploadResume);

export default resumeRoute;
