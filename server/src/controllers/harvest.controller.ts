import { NextFunction, Request, Response } from "express";
import Harvest from "../models/Harvest";
import Hive from "../models/Hive";
import { RequestEnhanced } from "../models/interfaces/utils";

export async function create(
  req: RequestEnhanced,
  res: Response,
  next: NextFunction
) {
  const { userID } = req.decodedToken;
  const newHarvest = await Harvest.create({ ...req.body, userID });
  // Update the total on the hive
  const hive = await Hive.findById(req.body.hive);
  if (!hive) throw new Error("Hive not found");
  hive.totalHarvests = hive.totalHarvests + req.body.amount;
  await hive.save();
  return res.status(201).json({ harvest: newHarvest });
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
