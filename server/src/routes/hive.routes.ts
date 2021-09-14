import { Router } from "express";
import { verifyTokenMiddleware } from "../middlewares/verifyToken";
import * as HiveCtlr from "../controllers/hive.controller";

const router = Router();

router.use(verifyTokenMiddleware);
//C
router.post("/create", HiveCtlr.create);
//R
router.get("/", HiveCtlr.readAll); //all
router.get("/:id", HiveCtlr.readOne); //one
//U
router.put("/:id", HiveCtlr.updateOne);
//D
router.delete("/:id", HiveCtlr.deleteOne);

export default router;
