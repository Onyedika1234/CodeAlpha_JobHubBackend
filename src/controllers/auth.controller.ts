import { Request, Response } from "express";
import prisma from "../utils/prisma.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { signUpDto, loginDto } from "../utils/dtos.ts";
dotenv.config();

export const signUp = async (req: Request, res: Response) => {
  try {
    let { name, username, email, password, role } = signUpDto(req.body);
    role = role.toUpperCase();

    const existingEmail = await prisma.user.findUnique({
      where: { email },
      select: { email: true },
    });

    if (existingEmail) {
      res.status(400).json({
        success: false,
        message:
          "A user with this email already exist, try another email address.",
      });
    }

    const existingUsername = await prisma.user.findUnique({
      where: { username },
      select: { username: true },
    });

    if (existingUsername) {
      res.status(400).json({
        success: false,
        message:
          "A user with this username already exist, try another username",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        username: username,
        password: hashPassword,
        role: role,
      },
    });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 168 * 60 * 60 * 1000,
    });

    res.cookie("userId", user.id, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 168 * 60 * 60 * 1000,
    });

    res
      .status(201)
      .json({ success: true, message: "User Successfully Created", user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginDto(req.body);

    const user: any = await prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      res.status(404).json({
        success: false,
        message: "User not found, Create new account",
      });

    const passwordMatches = bcrypt.compare(password, user.password);

    if (!passwordMatches) res.status(400).json("Invalid Password");

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 168 * 60 * 60 * 1000,
    });

    res.cookie("userId", user.id, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 168 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ success: true, message: "User logged in Successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const Logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.clearCookie("userId");
    res.clearCookie("employerId");
    res.clearCookie("candidateId");
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
};
