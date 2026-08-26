import express, { Router, Response } from "express";
import { authorize, rbac } from "../middlewares/auth.middleware.ts";
import { validateJob } from "../middlewares/validate.middleware.ts";
import { createJob } from "../controllers/job.controller.ts";

const jobRouter: Router = express.Router();

//Post Job: This will be done by only a recuiter, so rbac will be used

jobRouter.post("/create", authorize, rbac, validateJob, createJob);
export default jobRouter;
