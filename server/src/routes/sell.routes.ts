import { Router } from "express";
import { verifyTokenMiddleware } from "../middlewares/verifyToken";
import * as SellCtlr from "../controllers/sell.controller";

const router = Router();

router.use(verifyTokenMiddleware);
//C
router.post("/create", SellCtlr.create);
//R
router.get("/", SellCtlr.readAll); //all
router.get("/:id", SellCtlr.readOne); //one
//U
router.put("/:id", SellCtlr.updateOne);
//D
router.delete("/:id", SellCtlr.deleteOne);

export default router;
