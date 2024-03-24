import { Router } from "express";
import * as Mutations from "./mutations";

const orderRoutes = Router();

orderRoutes.post("/", Mutations.createOrder);

export default orderRoutes;
