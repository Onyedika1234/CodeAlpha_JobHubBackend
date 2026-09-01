import { Request, Response, NextFunction } from "express";
import prisma from "../utils/prisma.ts";

export const check = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { resumeId, coverletter } = req.body;
    const candidateId = req.cookies.candidateId;
    const { id }: any = req.params;

    if (!id)
      res.status(400).json({ success: false, message: "Job ID is missing" });

    const job = await prisma.job.findUnique({
      where: { id },
    });

    if (!job)
      res.status(404).json({
        success: false,
        message: "Job not found, Try applying for another job",
      });

    const resume = await prisma.resume.findUnique({
      where: { id: resumeId },
      include: { candidate: true },
    });

    if (!resume)
      res.status(404).json({ success: false, message: "Resume not found." });

    if (resume?.candidate.id !== candidateId) {
      res.status(400).json({
        success: false,
        message: "Resume does not belong to this user",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
