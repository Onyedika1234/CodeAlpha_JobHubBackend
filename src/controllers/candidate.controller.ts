import { Request, Response } from "express";
import prisma from "../utils/prisma.ts";
import { candidateDto } from "../utils/dtos.ts";
export const createCandidate = async (req: Request, res: Response) => {
  try {
    const { userId } = req.cookies;
    const { bio, phone, location, skills } = req.body;

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user)
      res
        .status(404)
        .json({ success: false, message: "User not found. Login to continue" });

    const data = await prisma.$transaction([
      prisma.candidate.create({
        data: {
          bio,
          phone,
          location,
          skills,
        },
      }),
    ]);

    res.cookie("candidateId", data[0].id, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 168 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "Candidate Profile Created Successfully",
      candidate: candidateDto(data[0]),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getCandidate = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;

    const candidate = await prisma.candidate.findUnique({
      where: { id },
      select: {
        bio: true,
        phone: true,
        location: true,
        skills: true,
      },
    });

    if (!candidate)
      res.status(404).json({ success: false, message: "Candidate not found" });

    res.status(200).json({ success: true, candidate });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
