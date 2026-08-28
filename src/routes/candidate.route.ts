import express, { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.ts";
import { validateCandidate } from "../middlewares/validate.middleware.ts";
import {
  createCandidate,
  getCandidate,
} from "../controllers/candidate.controller.ts";

const candidateRoute: Router = express.Router();

candidateRoute.post("/", authorize, validateCandidate, createCandidate);

candidateRoute.get("/:id", authorize, getCandidate);

export default candidateRoute;
