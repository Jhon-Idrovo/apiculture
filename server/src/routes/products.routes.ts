/**
 * example routing for a model
 */

import { Router } from "express";
import * as ProductsCtlr from "../controllers/products.controller";
import { verifyTokenMiddleware } from "../middlewares/verifyToken";
import { runAsync } from "../utils/utils";
const router = Router();
router.use(verifyTokenMiddleware);
router.get("/", runAsync(ProductsCtlr.readAll));
router.get("/:id", runAsync(ProductsCtlr.readOne));
router.post("/create", runAsync(ProductsCtlr.createOne));
router.delete("/:id", runAsync(ProductsCtlr.deleteOne));
router.put("/:id", runAsync(ProductsCtlr.updateOne));
export default router;
