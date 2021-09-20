import { NextFunction, Request, Response } from "express";
import { RequestEnhanced } from "../models/interfaces/utils";
import Sell from "../models/Sell";

export async function create(req: Request, res: Response, next: NextFunction) {
  const { userID, role } = (req as RequestEnhanced).decodedToken;
  const newSell = await Sell.create({ ...req.body, userID });
  return res.status(201).json({ sell: newSell });
}
export async function readOne(req: Request, res: Response, next: NextFunction) {
  const { userID, role } = (req as RequestEnhanced).decodedToken;
  const sell = await Sell.findById(req.params.id);
  return res.json({ sell });
}
export async function readAll(req: Request, res: Response, next: NextFunction) {
  const { userID, role } = (req as RequestEnhanced).decodedToken;
  const sells = await Sell.find({ userID });
  return res.json({ sells });
}
export async function updateOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userID, role } = (req as RequestEnhanced).decodedToken;
  await Sell.findByIdAndUpdate(req.params.id, req.body);
  return res.send();
}
export async function deleteOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userID, role } = (req as RequestEnhanced).decodedToken;
  await Sell.findByIdAndDelete(req.params.id);
  return res.send();
}
