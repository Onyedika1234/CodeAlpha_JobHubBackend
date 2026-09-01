import { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const apply = async (req: Request, res: Response) => {
  try {
    const { resumeId, coverletter } = req.body;
    const candidateId = req.cookies.candidateId;
    const { id }: any = req.params; // Job Id

    // const appliedJob = await prisma.application.create({
    //   data: {
    //     candidateId,
    //     jobId: id,
    //     resumeId,
    //     coverletter,
    //   },
    // });

    const appliedJob = await prisma.application.create({
      data: {
        candidateId,
        resumeId,
        coverletter,
        jobId: id,
      },
    });

    res
      .status(201)
      .json({ success: true, message: "Application Successful", appliedJob });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Internal Server Error ${error}` });
  }
};
