/**
 * express app configuration
 */
import express, { Response, Request } from "express";
import cors from "cors";
import morgan from "morgan";

import authRouter from "./auth.routes";
import productRouter from "./products.routes";
import userRouter from "./user.routes";
import hiveRouter from "./hive.routes";
import expenseRouter from "./expense.routes";
import sellRouter from "./sell.routes";

import { basePath } from "../config/config";
import passport from "passport";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
//initialize passport
app.use(passport.initialize());

app.use(`${basePath}/auth`, authRouter);
app.use(`${basePath}/users`, userRouter);
app.use(`${basePath}/products`, productRouter);
app.use(`${basePath}/hive`, hiveRouter);
app.use(`${basePath}/expense`, expenseRouter);
app.use(`${basePath}/sell`, sellRouter);
//handle wrong paths
app.use("*", (req: Request, res: Response) =>
  res.status(404).json({ error: "Page not found" })
);

export default app;
