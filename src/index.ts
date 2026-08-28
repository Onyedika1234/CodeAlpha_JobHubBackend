import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.ts";
import jobRouter from "./routes/job.route.ts";
import { globalLimit } from "./utils/ratelimit.ts";
import cookieParser from "cookie-parser";
import employerRoute from "./routes/employer.route.ts";
import candidateRoute from "./routes/candidate.route.ts";
dotenv.config();

const app: Application = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(cookieParser());

app.use(globalLimit);

//Authentication
app.use("/auth", authRouter);

//Company
app.use("/employer", employerRoute);

app.use("/candidates", candidateRoute);

//Jobs
app.use("/jobs", jobRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Job Hub Api");
});

app.use((req: Request, res: Response) =>
  res.status(404).json({ message: "Route not found..." }),
);
app.listen(process.env.PORT, () => console.log("Server running..."));
