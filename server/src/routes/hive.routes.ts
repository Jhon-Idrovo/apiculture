import { Router } from "express";
import { verifyTokenMiddleware } from "../middlewares/verifyToken";
import * as HiveCtlr from "../controllers/hive.controller";
import { runAsync } from "../utils/utils";

const router = Router();

router.use(verifyTokenMiddleware);
//C
router.post("/create", runAsync(HiveCtlr.create));
//R
router.get("/", runAsync(HiveCtlr.readAll)); //all
router.get("/read-one/:id", runAsync(HiveCtlr.readOne)); //one
//U
router.put("/update/:id", runAsync(HiveCtlr.updateOne));
//D
router.delete("/delete/:id", runAsync(HiveCtlr.deleteOne));

export default router;
