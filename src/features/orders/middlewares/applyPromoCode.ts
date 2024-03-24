import database from "@/database/prisma";
import { Prisma } from "@prisma/client";
import { compareAsc } from "date-fns";

export const applyPromoCodeExtension = Prisma.defineExtension({
  name: "applyPromoCode",
  query: {
    order: {
      async create({ args, query }) {
        const promoCodeId = args.data?.promoCodeId;
        if (promoCodeId) {
          const promoCode = await database.promoCode.findUnique({
            where: {
              promoCodeId,
            },
          });

          if (!promoCode) {
            throw new Error("Promo code not found");
          }

          if (compareAsc(new Date(), promoCode.expiresOn) === 1) {
            throw new Error("Promo code is expired");
          }

          switch (promoCode.discountType) {
            case "DELIVERY":
              args.data.shippingFee -= promoCode.discountAmount;
              break;
          }
        }

        return query(args);
      },
    },
  },
});
