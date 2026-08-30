import { Request, Response } from "express";
import { uploadToCloudinary } from "../utils/uploadToClouadinary.ts";
import prisma from "../utils/prisma.ts";

export const uploadResume = async (req: Request, res: Response) => {
  try {
    const candidateId = req.cookies.candidateId;

    if (!candidateId)
      res.status(401).json({ success: false, message: "Unauthorized" });

    if (!req.file) {
      res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const result = await uploadToCloudinary(req.file.buffer, "jobhub/resumes");

    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
    });

    if (!candidate)
      res.status(404).json({ success: false, message: "Candiate not found" });

    const resume = await prisma.resume.create({
      data: {
        candidateId: candidate?.id,
        fileName: req.file?.originalname,
        fileUrl: result.secure_url,
        publicId: result.public_id,
      },
    });

    res
      .status(201)
      .json({ success: true, message: "Resume Uploaded Successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Error uploading resume ${error}` });
  }
};
