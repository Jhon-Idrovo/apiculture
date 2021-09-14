import { Router } from "express";
import { verifyTokenMiddleware } from "../middlewares/verifyToken";
import * as ExpenseCtrl from "../controllers/expense.controller";
import { runAsync } from "../utils/utils";

const router = Router();

router.use(verifyTokenMiddleware);
//C
router.post("/create", runAsync(ExpenseCtrl.create));
//R
router.get("/", runAsync(ExpenseCtrl.readAll)); //all
router.get("/:id", runAsync(ExpenseCtrl.readOne)); //one
//U
router.put("/:id", runAsync(ExpenseCtrl.updateOne));
//D
router.delete("/:id", runAsync(ExpenseCtrl.deleteOne));

export default router;
