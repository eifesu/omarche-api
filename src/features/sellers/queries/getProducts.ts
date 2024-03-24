import { Request, Response, NextFunction } from "express";
import database from "@/database/prisma";
import { z } from "zod";

const paramsSchema = z.object({
  id: z.string(),
});

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    const products = await database.product.findMany({
      where: {
        sellerId: id,
      },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};
