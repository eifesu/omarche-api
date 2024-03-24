import database from "@/database/prisma";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const bodySchema = z.object({
  userId: z.string().uuid(),
  lines: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().min(1),
    })
  ),
  address: z.string(),
  geolocation: z.string(),
  paymentMethod: z.string(),
  promoCodeId: z.string().optional(),
});

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, lines, promoCodeId, geolocation, address, paymentMethod } =
      bodySchema.parse(req.body);

    const order = await database.order.create({
      data: {
        userId,
        lines: {
          create: lines,
        },
        address,
        geolocation,
        paymentMethod,
        promoCodeId,
        shippingFee: 1200,
      },
    });

    res.json(order);
  } catch (error) {
    next(error);
  }
};
