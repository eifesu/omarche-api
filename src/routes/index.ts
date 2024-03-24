import { userRoutes } from "@/features/users";
import { authRoutes } from "@/features/auth";
import { marketsRoutes } from "@/features/markets";
import { productRoutes } from "@/features/products";

import errorMiddleware from "@/middlewares/errorHandler";
import requestLoggingMiddleware from "@/middlewares/requestLogging";
import * as Sentry from "@sentry/node";
import { Router } from "express";
import { orderRoutes } from "@/features/orders";

const appRoutes = Router();

// Log every request path and method before it is routed
appRoutes.use(requestLoggingMiddleware);

// Add feature routes
appRoutes.use("/auth", authRoutes);
appRoutes.use("/users", userRoutes);
appRoutes.use("/markets", marketsRoutes);
appRoutes.use("/products", productRoutes);
appRoutes.use("/orders", orderRoutes);
// Sends errors to Sentry
appRoutes.use(Sentry.Handlers.errorHandler());

// Handle errors throughout routes
appRoutes.use(errorMiddleware);

export default appRoutes;
