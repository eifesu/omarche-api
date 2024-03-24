import database from "@/database/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import InvalidEnvError from "@/errors/InvalidEnvError";
import { generateCookie } from "@/utils/cookie";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { JWT_SECRET_KEY } from "@/config";

const bodySchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6)
    .transform(async (val) => await bcrypt.hash(val, 10)),
  firstName: z.string().min(6),
  lastName: z.string().min(6),
  birthDate: z.date(),
  gender: z.enum(["M", "F"]),
  phone: z.string().length(10),
  city: z.string().min(6),
  street: z.string().min(6),
});

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!JWT_SECRET_KEY) throw new InvalidEnvError();

    const body = await bodySchema.parseAsync(req.body);
    const user = await database.user.create({ data: body });
    const token = jwt.sign({ id: user.userId }, JWT_SECRET_KEY);

    const cookie = generateCookie("jwt", token);
    res.cookie(...cookie).send();
  } catch (err) {
    next(err);
  }
};
