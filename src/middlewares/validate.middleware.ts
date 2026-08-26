import { Request, Response, NextFunction } from "express";
import { signUpDto, loginDto, employerDto, jobDto } from "../utils/dtos.ts";

//Validation of Signup data
export const validateSignUp = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let { name, username, email, password, role } = signUpDto(req.body);

  if (!name || !username || !email || !password || !role) {
    res
      .status(400)
      .json({ success: false, message: "Some Parameters are missing" });
  }
  if (
    typeof name !== "string" ||
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof role !== "string"
  ) {
    res.status(422).json({
      success: false,
      message: "Parameters are of the wrong data type",
    });
  }
  name = name.trim();
  email = email.trim();
  password = password.trim();
  role = role.trim();
  username = role.trim();
  next();
};

//Validation of Signup data
export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let { email, password } = loginDto(req.body);

  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, message: "Some Parameters are missing" });
  }
  if (typeof email !== "string" || typeof password !== "string") {
    res.status(422).json({
      success: false,
      message: "Parameters are of the wrong data type",
    });
  }
  email = email.trim();
  password = password.trim();
  next();
};

export const validateCompany = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let { name, description } = employerDto(req.body);

  if (!name || !description) {
    res
      .status(400)
      .json({ success: false, message: "Important parameters are missing" });
  }

  if (typeof name !== "string" || typeof description !== "string") {
    res.status(422).json({
      success: false,
      message: "Parameters are of the wrong data types",
    });
  }

  name = name.trim();
  description = description.trim();

  next();
};

export const validateJob = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let { title, salary, summary, jobtype } = jobDto(req.body);
  if (!title || !salary || !summary || !jobtype)
    res
      .status(400)
      .json({ success: false, message: "Some Parameters are missing" });

  if (
    typeof title !== "string" ||
    typeof salary !== "string" ||
    typeof summary !== "string" ||
    typeof jobtype !== "string"
  ) {
    res.status(422).json({
      success: false,
      message: "Parameters are of the wrong data type",
    });
  }
  title = title.trim();
  salary = salary.trim();
  summary = summary.trim();
  jobtype = jobtype.trim();

  next();
};
