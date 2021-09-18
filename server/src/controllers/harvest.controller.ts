import { NextFunction, Request, Response } from "express";
import Harvest from "../models/harvest";
import { RequestEnhanced } from "../models/interfaces/utils";

export async function create(
  req: RequestEnhanced,
  res: Response,
  next: NextFunction
) {
  const { userID } = req.decodedToken;
  await Harvest.create({ ...req.body }, userID);
  return res.sendStatus(201);
}
export async function readOne(
  req: RequestEnhanced,
  res: Response,
  next: NextFunction
) {}
export async function readAll(
  req: RequestEnhanced,
  res: Response,
  next: NextFunction
) {
  const { userID } = req.decodedToken;
  const harvests = await Harvest.find({ userID });
  return res.json({ harvests });
}
export async function updateOne(
  req: RequestEnhanced,
  res: Response,
  next: NextFunction
) {}
export async function deleteOne(
  req: RequestEnhanced,
  res: Response,
  next: NextFunction
) {}
