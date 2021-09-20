import { NextFunction, Request, Response } from "express";
import Expense from "../models/Expense";
import { RequestEnhanced } from "../models/interfaces/utils";

export async function create(req: Request, res: Response, next: NextFunction) {
  const { userID, role } = (req as RequestEnhanced).decodedToken;
  const { amount, date, description, hive } = req.body;
  const newExpense = await Expense.create({
    ...req.body,
    userID,
  });
  return res.status(201).json({ expense: newExpense });
}
export async function readOne(req: Request, res: Response, next: NextFunction) {
  const { userID, role } = (req as RequestEnhanced).decodedToken;
  const expense = await Expense.findById(req.params.id);
  return res.json({ expense });
}
export async function readAll(req: Request, res: Response, next: NextFunction) {
  const { userID, role } = (req as RequestEnhanced).decodedToken;
  const expenses = await Expense.find({ userID })
    .populate("hive", "name")
    .exec();
  return res.json({ expenses });
}
export async function updateOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userID, role } = (req as RequestEnhanced).decodedToken;
  await Expense.findByIdAndUpdate(req.params.id, req.body);
  return res.send();
}
export async function deleteOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userID, role } = (req as RequestEnhanced).decodedToken;
  await Expense.findByIdAndDelete(req.params.id);
  return res.send();
}
