import { NextFunction, Request, Response } from "express";
import Hive from "../models/Hive";
import { RequestEnhanced } from "../models/interfaces/utils";

export async function create(req: Request, res: Response, next: NextFunction) {
  const { userID } = (req as RequestEnhanced).decodedToken;
  const { date, name } = req.body;
  await Hive.create({ installationDate: date, name, userID });
  res.sendStatus(201);
}
export async function readOne(req: Request, res: Response, next: NextFunction) {
  const { userID, role } = (req as RequestEnhanced).decodedToken;
}
export async function readAll(req: Request, res: Response, next: NextFunction) {
  const { userID, role } = (req as RequestEnhanced).decodedToken;
  const hives = await Hive.find({ userID });
  res.json({ hives });
}
export function updateOne(req: Request, res: Response, next: NextFunction) {
  const { userID, role } = (req as RequestEnhanced).decodedToken;
  const {} = req.body;
}
export function deleteOne(req: Request, res: Response, next: NextFunction) {
  const { userID, role } = (req as RequestEnhanced).decodedToken;
}
