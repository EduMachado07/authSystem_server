import jwt from "jsonwebtoken";
import { BadRequestError } from "../config/classErrors.config.js";

// -- ASSINATURA DE TOKENS --
async function signTokenJwt(email) {
  const secretAccess = process.env.JWT_SECRET_ACCESS;
  const secretRefresh = process.env.JWT_SECRET_REFRESH;

  if (!secretAccess | !secretRefresh)
    throw new BadRequestError("As chaves token não foram definidas");

  const accessToken = jwt.sign({ email }, secretAccess, { expiresIn: "1h" });
  const refreshToken = jwt.sign({ email }, secretRefresh, { expiresIn: "7d" });

  return { accessToken, refreshToken };
}
export default signTokenJwt;
