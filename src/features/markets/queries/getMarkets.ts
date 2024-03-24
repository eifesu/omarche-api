import { Request, Response, NextFunction } from "express";
import database from "@/database/prisma";

export const getMarkets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const markets = await database.market.findMany();
    res.json(markets);
  } catch (error) {
    next(error);
  }
};
