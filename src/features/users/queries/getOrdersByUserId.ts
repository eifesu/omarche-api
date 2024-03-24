import database from "@/database/prisma";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const paramSchema = z.object({
  userId: z.string(),
});

export const getOrdersByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = paramSchema.parse(req.params);
    const orders = await database.order.findMany({
      where: {
        userId,
      },
      include: {
        lines: {
          include: {
            product: true,
          },
        },
      },
    });
    res.send(orders);
  } catch (error) {
    next(error);
  }
};
