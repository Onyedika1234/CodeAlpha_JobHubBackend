import { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const createJob = async (req: Request, res: Response) => {
  try {
    const employerId = req.cookies.employerId;

    let { title, salary, summary, jobtype } = req.body;
    jobtype = jobtype.toUpperCase();
    const job = await prisma.job.create({
      data: {
        title,
        salary,
        summary,
        jobtype,
        employerId,
      },
      include: {
        employer: true,
        candidates: true,
      },
    });

    res.status(201).json({ success: true, job });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Internal Server Error ${error}` });
  }
};

// OUTPUT DTOS SHOULD BE PUT IN PLACE
