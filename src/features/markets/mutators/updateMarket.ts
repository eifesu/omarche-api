import { Response, Request, NextFunction } from "express";
import database from "@/database/prisma";
import { z } from "zod";

const bodySchema = z.object({
  name: z.string().optional(),
  geolocation: z.string().optional(),
  photoUrl: z.string().optional(),
});

const paramsSchema = z.object({
  marketId: z.string().uuid(),
});

export const updateMarket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { marketId } = paramsSchema.parse(req.params);
    const { name, geolocation, photoUrl } = bodySchema.parse(req.body);
    const updatedMarket = await database.market.update({
      where: { marketId },
      data: { name, geolocation, photoUrl },
    });
    res.json(updatedMarket);
  } catch (error) {
    next(error);
  }
};
