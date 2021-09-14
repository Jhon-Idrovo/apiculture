import { NextFunction, Request, Response } from "express";
import { RequestEnhanced, ResponseError } from "../models/interfaces/utils";
import Role from "../models/Role";
import User from "../models/User";

export async function getOrCreateUser(
  email: string,
  username: string,
  authMethod: string,
  password: string,
  authProviderId?: string
) {
  let user = await User.findOne({ email }).exec();
  if (!user) {
    const role = await Role.findOne({ name: "User" });
    user = await User.create({
      email,
      username,
      role,
      authMethod,
      // to avoid duplicate key error
      credits: 10,
      password: await User.encryptPassword(password),
      authProviderId,
    });
  }
  return user;
}

export function generateCode() {
  let code = Array(6);
  for (let i = 0; i < code.length; i++) {
    code[i] = Math.floor(Math.random() * 9);
  }
  console.log(code);

  return code.join("");
}
export function runAsync(func: Function) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("RUNNING ASYNC");

      return func(req, res, next);
    } catch (error) {
      return res.status(400).json({
        error: { message: (error as Error).message, completeError: error },
      } as ResponseError);
    }
  };
}
