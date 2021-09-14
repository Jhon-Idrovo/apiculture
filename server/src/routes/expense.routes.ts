import { Router } from "express";
import { verifyTokenMiddleware } from "../middlewares/verifyToken";
import * as ExpenseCtrl from "../controllers/expense.controller";

const router = Router();

router.use(verifyTokenMiddleware);
//C
router.post("/create", ExpenseCtrl.create);
//R
router.get("/", ExpenseCtrl.readAll); //all
router.get("/:id", ExpenseCtrl.readOne); //one
//U
router.put("/:id", ExpenseCtrl.updateOne);
//D
router.delete("/:id", ExpenseCtrl.deleteOne);

export default router;
