import database from "@/database/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import InvalidEnvError from "@/errors/InvalidEnvError";
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET_KEY } from "@/config";
import { z } from "zod";
import { generateCookie } from "@/utils/cookie";

const bodySchema = z.object({
  email: z.string().min(6),
  password: z.string(),
});

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!JWT_SECRET_KEY) throw new InvalidEnvError();

    const body = bodySchema.parse(req.body);

    const user = await database.user.findFirst({
      where: { email: body.email },
    });

    if (!user) return res.status(401).send("Unauthorized");

    const match = await bcrypt.compare(body.password, user.password);

    if (match) {
      const token = jwt.sign({ sub: user.email }, JWT_SECRET_KEY);
      const cookie = generateCookie("jwt", token);

      res.cookie(...cookie).send();
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (err) {
    next(err);
  }
};
