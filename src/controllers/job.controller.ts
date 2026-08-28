import { Request, Response } from "express";
import prisma from "../utils/prisma.ts";
import { jobOutputDto } from "../utils/dtos.ts";

export const createJob = async (req: Request, res: Response): Promise<void> => {
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

export const getJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    // const jobs = await prisma.job.findMany({
    //   include: { employer: true },
    // });

    const [jobs] = await prisma.$transaction([
      prisma.job.findMany({
        select: {
          title: true,
          salary: true,
          summary: true,
          jobtype: true,
          createdAt: true,
          // Shape the relation directly in the query
          employer: {
            select: {
              name: true,
              description: true,
            },
          },
        },
      }),
      prisma.job.count(),
    ]);

    // 2. Map only for formatting that SQL can't easily do (like Date locales),
    // but now it only runs on your paginated subset (e.g., 10 or 20 items), NOT 10,000.
    const formattedJobs = jobs.map((job) => ({
      ...job,
      createdAt: job.createdAt.toLocaleDateString("fr-FR"),
    }));

    res.status(200).json({ success: true, jobs: formattedJobs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id }: any = req.params;

    const job = await prisma.job.findUnique({
      where: { id },
      include: { employer: true },
    });

    res.status(200).json({ success: true, job: jobOutputDto(job) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const editJob = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;
    let { title, salary, summary, jobtype } = req.body;
    jobtype = jobtype.toUpperCase();

    const newJob = await prisma.job.update({
      where: { id },
      data: {
        title,
        salary,
        summary,
        jobtype,
      },
      include: {
        employer: true,
      },
    });

    res.status(200).json({ success: true, job: jobOutputDto(newJob) });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Internal Server Error ${error}` });
  }
};
// OUTPUT DTOS SHOULD BE PUT IN PLACE
