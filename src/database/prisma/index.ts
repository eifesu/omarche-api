import { PrismaClient } from "@prisma/client";

import { orderMiddlewares } from "@/features/orders";

const database = new PrismaClient().$extends(
  orderMiddlewares.applyPromoCodeExtension
);

export default database;
