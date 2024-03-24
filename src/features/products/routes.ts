import * as Queries from "./queries";
import { Router } from "express";

const productRoutes = Router();

productRoutes.get("/:id", Queries.getProductById);

export default productRoutes;
