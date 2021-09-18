import { NextFunction, Request, Response } from "express";
import Hive from "../models/Hive";
import { IHive } from "../models/interfaces/hives";
import { RequestEnhanced } from "../models/interfaces/utils";

export async function create(req: Request, res: Response, next: NextFunction) {
  const { userID } = (req as RequestEnhanced).decodedToken;
  const { date, name } = req.body;
  await Hive.create({ installationDate: date, name, userID });
  return res.sendStatus(201);
}
export async function readOne(req: Request, res: Response, next: NextFunction) {
  res.json({ hive: await Hive.findById(req.params.id) });
}
export async function readAll(req: Request, res: Response, next: NextFunction) {
  const { userID, role } = (req as RequestEnhanced).decodedToken;
  const hives = await Hive.find({ userID });
  return res.json({ hives });
}
export async function updateOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { role } = (req as RequestEnhanced).decodedToken;
  const { name, installationDate } = req.body as IHive;
  const hive = await Hive.findById(req.params.id);
  if (!hive) throw new Error("Hive not found");

  await hive.update({ name, installationDate });
  return res.send();
}
export async function deleteOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  await Hive.findByIdAndDelete(req.params.id);
  return res.send();
}

export async function createHarvest(
  req: RequestEnhanced,
  res: Response,
  next: NextFunction
) {
  const { userID } = req.decodedToken;

  const hive = await Hive.findById(req.params.id);
  if (!hive || hive.userID.toString() !== userID)
    throw new Error("Hive not found");
  hive.harvests?.push(req.body);
  await hive.save();
  res.sendStatus(201);
}
