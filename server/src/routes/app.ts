import cors from 'cors';
/**
 * express app configuration
 */
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import passport from 'passport';

import { basePath } from '../config/config';
import authRouter from './auth.routes';
import expenseRouter from './expense.routes';
import harvestRouter from './harvest.routes';
import hiveRouter from './hive.routes';
import productRouter from './products.routes';
import sellRouter from './sell.routes';
import userRouter from './user.routes';

const app = express();

app.use(express.json());
app.use(cors());
//initialize passport
app.use(passport.initialize());

app.use(`${basePath}/auth`, authRouter);
app.use(`${basePath}/users`, userRouter);
app.use(`${basePath}/product`, productRouter);
app.use(`${basePath}/hive`, hiveRouter);
app.use(`${basePath}/expense`, expenseRouter);
app.use(`${basePath}/sell`, sellRouter);
app.use(`${basePath}/harvest`, harvestRouter);
//handle wrong paths
app.use("*", (req: Request, res: Response) =>
  res.status(404).json({ error: "Page not found" })
);

export default app;
