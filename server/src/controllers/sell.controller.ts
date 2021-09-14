import { NextFunction, Request, Response } from "express";
import { RequestEnhanced } from "../models/interfaces/utils";

export function create(req: Request, res: Response, next: NextFunction) {
  const { userID, role } = (req as RequestEnhanced).decodedToken;
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
