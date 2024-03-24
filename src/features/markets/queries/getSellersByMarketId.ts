import { Request, Response, NextFunction } from "express";
import database from "@/database/prisma";
import { z } from "zod";

const paramsSchema = z.object({
  id: z.string(),
});

export const getSellersByMarketId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    const products = await database.seller.findMany({
      where: {
        marketId: id,
      },
      include: {
        products: true,
      },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};
