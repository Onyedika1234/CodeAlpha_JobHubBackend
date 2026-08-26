import { Request, Response } from "express";
import prisma from "../utils/prisma.ts";
export const createEmployer = async (req: Request, res: Response) => {
  try {
    const { userId } = req.cookies;
    const { name, description } = req.body;

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user)
      res
        .status(404)
        .json({ success: false, message: "User not found. Login to continue" });

    const data = await prisma.$transaction([
      prisma.employer.create({
        data: {
          name,
          description,
        },
      }),

      prisma.user.update({
        where: { id: userId },
        data: {
          role: "RECRUITER",
        },
      }),
    ]);

    res.cookie("employerId", data[0].id, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 168 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "Employer Created Successfully",
      employer: data[0],
    });
  } catch (error) {
    // res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getEmployers = async (req: Request, res: Response) => {
  try {
    const employers = await prisma.employer.findMany();
    res.status(200).json({ success: true, employers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getEmployer = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;

    const employer = await prisma.employer.findUnique({ where: { id } });

    if (!employer)
      res.status(404).json({ success: false, message: "Employer not found" });

    res.status(200).json({ success: true, employer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
