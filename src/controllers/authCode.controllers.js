import {
  sendEmailCode,
  verifyAuthCode,
} from "../services/authCode.services.js";
import { BadRequestError } from "../config/classErrors.config.js";
// ENVIA EMAIL COM CODIGO
async function SendAuthCode(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) throw new BadRequestError("Email do usuário não informado");

    await sendEmailCode(email);

    res.status(201).json({ message: `Código enviado para o email ${email}` });
  } catch (error) {
    next(error);
  }
}
// VERIFICA O CODIGO
async function VerifyAuthCode(req, res, next) {
  try {
    const { token, code } = req.body;
    if (!token || !code)
      throw new BadRequestError("Dados do usuário não informados");

    await verifyAuthCode(token, code);

    res.status(201).json({ message: "email do usuário verificado" });
  } catch (error) {
    next(error);
  }
}

export { SendAuthCode, VerifyAuthCode };
