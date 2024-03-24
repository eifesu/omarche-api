import { Request, Response, NextFunction } from "express";
import database from "@/database/prisma";
import { z } from "zod";

const paramsSchema = z.object({
  id: z.string(),
});

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    const product = await database.product.findUnique({
      where: {
        productId: id,
      },
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
};
