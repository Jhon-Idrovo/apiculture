import axios, { AxiosError } from "axios";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
export declare type RoleName = "Admin" | "User" | "Guest";
//for the payload being sent into the token
export declare interface TokenPayloadInterface extends JwtPayload {
  userID: string;
  role: RoleName;
}

export function verifyToken(token: string) {
  //   try {
  //     const payload = jwt.verify(token, process.env.JWT_TOKEN_SECRET as Secret);
  //     return payload as TokenPayloadInterface;
  //   } catch (error) {
  //     return false;
  //   }
  const tokenParts = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  );
  return tokenParts as TokenPayloadInterface;
}
export function errorToMessage(error: unknown) {
  return (
    axios.isAxiosError(error)
      ? (error as AxiosError).response?.data.error.message
      : (error as Error).message
  ) as string;
}
