import { Router } from "express";
import * as Queries from "./queries";

const userRoutes = Router();

userRoutes.get("/:id", Queries.getUserById);
userRoutes.get("/:id/orders", Queries.getOrdersByUserId);

export default userRoutes;
