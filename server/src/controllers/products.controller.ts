/**
 * logic for handling requests
 */

import { NextFunction, Request, Response } from 'express';

import { IProduct } from '../models/interfaces/products';
import { RequestEnhanced } from '../models/interfaces/utils';
import Product from '../models/Product';

//models
export async function readAll(req: Request, res: Response, next: NextFunction) {
  const products = await Product.find();
  return res.json({ products });
}
export async function readOne(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const product = await Product.findById(id);
  return res.json({ product });
}
// export async function getProdutHandler(req:Request, res:Response, next:NextFunction) { }
export async function deleteOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const product = await Product.findByIdAndDelete(req.params.id);
  return res.status(200).send();
}
export async function createOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userID } = (req as RequestEnhanced).decodedToken;
  const { price, name, description } = req.body as unknown as IProduct;
  console.log("creating product", { ...req.body });
  const product = await Product.create({
    price,
    name,
    description,
    userID,
  });
  return res.status(201).json({ product });
}

export async function updateOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  return res.sendStatus(200);
}
