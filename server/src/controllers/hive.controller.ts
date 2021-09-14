import { NextFunction, Request, Response } from "express";
import Hive from "../models/Hive";
import { RequestEnhanced } from "../models/interfaces/utils";

export async function create(req: Request, res: Response, next: NextFunction) {
  const { userID, role } = (req as RequestEnhanced).decodedToken;
  try {
  } catch (error) {}
  const newHive = await Hive.create(req.body);
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
