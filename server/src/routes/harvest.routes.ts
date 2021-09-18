import { Router } from "express";
import { verifyTokenMiddleware } from "../middlewares/verifyToken";
import * as HarvestCtlr from "../controllers/harvest.controller";
import { runAsync } from "../utils/utils";

const router = Router();

router.use(verifyTokenMiddleware);
//C
router.post("/create", runAsync(HarvestCtlr.create));
//R
router.get("/", runAsync(HarvestCtlr.readAll)); //all
router.get("/:id", runAsync(HarvestCtlr.readOne)); //one
//U
router.put("/:id", runAsync(HarvestCtlr.updateOne));
//D
router.delete("/:id", runAsync(HarvestCtlr.deleteOne));

export default router;
