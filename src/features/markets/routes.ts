import { Router } from "express";
import * as Queries from "./queries";
// import multer from "multer";

const marketRoutes = Router();
// const upload = multer();

marketRoutes.get("/", Queries.getMarkets);

marketRoutes.get("/:id/products", Queries.getSellersByMarketId);

// marketRoutes.post("/:userId/image", upload.single("image"), Mutator.uploadImage);

export default marketRoutes;
