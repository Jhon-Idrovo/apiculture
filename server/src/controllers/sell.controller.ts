import { NextFunction, Request, Response } from "express";
import { RequestEnhanced } from "../models/interfaces/utils";
import Sell from "../models/Sell";

export async function create(req: Request, res: Response, next: NextFunction) {
  const { userID, role } = (req as RequestEnhanced).decodedToken;
  await Sell.create(req.body);
  return res.sendStatus(201);
}
export function readOne(req: Request, res: Response, next: NextFunction) {
  const { userID, role } = (req as RequestEnhanced).decodedToken;
}
export function readAll(req: Request, res: Response, next: NextFunction) {
  const { userID, role } = (req as RequestEnhanced).decodedToken;
}
export function updateOne(req: Request, res: Response, next: NextFunction) {
  const { userID, role } = (req as RequestEnhanced).decodedToken;
}
export function deleteOne(req: Request, res: Response, next: NextFunction) {
  const { userID, role } = (req as RequestEnhanced).decodedToken;
}
