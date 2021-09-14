import { Router } from "express";
import { verifyTokenMiddleware } from "../middlewares/verifyToken";
import * as SellCtlr from "../controllers/sell.controller";
import { runAsync } from "../utils/utils";

const router = Router();

router.use(verifyTokenMiddleware);
//C
router.post("/create", runAsync(SellCtlr.create));
//R
router.get("/", runAsync(SellCtlr.readAll)); //all
router.get("/:id", runAsync(SellCtlr.readOne)); //one
//U
router.put("/:id", runAsync(SellCtlr.updateOne));
//D
router.delete("/:id", runAsync(SellCtlr.deleteOne));

export default router;
