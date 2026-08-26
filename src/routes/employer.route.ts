import express, { Router } from "express";
import { authorize, rbac } from "../middlewares/auth.middleware.ts";
import { validateCompany } from "../middlewares/validate.middleware.ts";
import {
  createEmployer,
  getEmployers,
  getEmployer,
} from "../controllers/employer.controller.ts";

const employerRoute: Router = express.Router();

//create new company. Only recuiters have the ability to do so.
employerRoute.post("/", authorize, rbac, validateCompany, createEmployer);

employerRoute.get("/", authorize, getEmployers);

employerRoute.get("/:id", authorize, getEmployer);

export default employerRoute;
