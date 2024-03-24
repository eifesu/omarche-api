import { Response, Request, NextFunction } from "express";
import database from "@/database/prisma";
import { z } from "zod";

const paramSchema = z.object({
  id: z.string(),
});

export const getSellerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = paramSchema.parse(req.params);
    const seller = await database.seller.findUnique({
      where: {
        sellerId: id,
      },
      include: {
        products: true,
      },
    });
    res.json(seller);
  } catch (error) {
    next(error);
  }
};
