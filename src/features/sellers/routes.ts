import { Router } from "express";
import * as Queries from "./queries";

const sellerRoutes = Router();

sellerRoutes.get("/:id", Queries.getSellerById);
sellerRoutes.get("/:id/products", Queries.getProducts);

export default sellerRoutes;
