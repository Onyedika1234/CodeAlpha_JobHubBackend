import { rateLimit } from "express-rate-limit";

export const globalLimit = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 20,
  message: "Too many request, please try again later",
  legacyHeaders: true,
  standardHeaders: true,
});

export const authLimit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: "Too many request, wait for 10mins and try again",
  legacyHeaders: true,
  standardHeaders: true,
});
