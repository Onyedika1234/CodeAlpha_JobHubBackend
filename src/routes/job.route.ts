import express, { Router } from "express";
import {
  authorize,
  authroizeEmployer,
  candidaterbac,
  rbac,
} from "../middlewares/auth.middleware.ts";
import {
  validateApplication,
  validateJob,
} from "../middlewares/validate.middleware.ts";
import {
  createJob,
  getJobs,
  getJob,
  editJob,
} from "../controllers/job.controller.ts";

import { check } from "../middlewares/application.middleware.ts";
import { apply } from "../controllers/application.controller.ts";

const jobRouter: Router = express.Router();

//Post Job: This will be done by only a recuiter, so rbac will be used

jobRouter.post("/create", authorize, rbac, validateJob, createJob);

//Get jobs
jobRouter.get("/", authorize, getJobs);

//Get a specific job
jobRouter.get("/:id", authorize, getJob);

//Edit job
jobRouter.put("/:id", authorize, rbac, authroizeEmployer, validateJob, editJob);

//Apply for jobs

jobRouter.post(
  "/:id/apply",
  authorize,
  candidaterbac,
  validateApplication,
  check,
  apply,
);
export default jobRouter;
