import { NextFunction, Request, Response } from "express";
import Hive from "../models/Hive";
import { RequestEnhanced } from "../models/interfaces/utils";

export async function create(req: Request, res: Response, next: NextFunction) {
  const { userID, role } = (req as RequestEnhanced).decodedToken;
  const { date, name } = req.body;
  await Hive.create({ installationDate: date, name });
  res.sendStatus(201);
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
