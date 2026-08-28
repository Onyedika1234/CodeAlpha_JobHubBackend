import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../utils/prisma.ts";
import { Request, Response, NextFunction } from "express";
dotenv.config();

// Authentication Middleware
export const authorize = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      //   const err = new Error("Unauthorized: No token provided");
      //   err.statusCode = 401;
      //   throw err;
      res.status(401).json("Unauthorized: No toke provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // req.user = decoded;

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const rbac = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.cookies.userId;

    if (!id) res.status(401).json({ success: false, message: "Unauthorized" });

    const user: any = await prisma.user.findUnique({
      where: { id },
      select: { role: true },
    });

    if (!user)
      res.status(401).json({ success: false, message: "Unauthorized" });

    if (user.role === "RECRUITER") {
      next();
    } else {
      res.status(401).json({
        success: false,
        message: "This ability is only accessed by recuiters",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const authroizeEmployer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { employerId } = req.cookies;
    const { id }: any = req.params; // Job Id

    const job = await prisma.job.findUnique({
      where: { id },
      select: { employerId: true },
    });

    if (!job)
      res.status(404).json({ success: false, message: "Job not found." });

    if (job?.employerId !== employerId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: `${error}` });
  }
};
