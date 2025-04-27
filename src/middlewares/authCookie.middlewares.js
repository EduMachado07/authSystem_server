import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../config/classErrors.config.js";

import dotenv from "dotenv";
dotenv.config();

const secretAccess = process.env.JWT_SECRET_ACCESS;
const secretRefresh = process.env.JWT_SECRET_REFRESH;

async function authCookie(req, res, next) {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
      throw new UnauthorizedError("Token de atualização não informado");

    // VERIFICA TOKEN REFRESH
    let decodedRefresh;
    try {
      decodedRefresh = jwt.verify(refreshToken, secretRefresh);
    } catch (error) {
      throw new UnauthorizedError("Token de atualização inválido");
    }

    // CRIA NOVOS TOKENS | ENVIA COMO COOKIES
    if (!accessToken) {
      // ASSINA NOVOS TOKENS
      const newAccessToken = jwt.sign(
        { email: decodedRefresh.email },
        secretAccess,
        { expiresIn: "15m" }
      );
      // ENVIA TOKENS COMO COOKIES
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      return next();
    }

    try {
      const decodeAccess = jwt.verify(accessToken, secretAccess);

      req.user = decodeAccess;
      return next();
    } catch (error) {
      throw new UnauthorizedError("Token de acesso inválido");
    }
  } catch (error) {
    next(error);
  }
}
export default authCookie;
