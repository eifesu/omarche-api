import database from "@/database/prisma";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const paramsSchema = z.object({
  userId: z.string(),
});

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = paramsSchema.parse(req.params);
    const user = await database.user.findUnique({
      where: { userId },
    });
    res.send(user);
  } catch (err) {
    next(err);
  }
};
