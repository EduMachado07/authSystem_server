import {
  sendEmailCode,
  verifyAuthCode,
} from "../services/authCode.services.js";
import { BadRequestError } from "../config/classErrors.config.js";

// CREATE CODE
async function SendAuthCode(req, res, next) {
  try {
    const { idUser } = req.body;
    if (!idUser) throw new BadRequestError("Email do usuário não informado");

    // SERVICE
    await sendEmailCode(idUser);

    res
      .status(201)
      .json({ message: "Código enviado para o seu email", user: idUser });
  } catch (error) {
    next(error);
  }
}
// VERIFY CODE
async function VerifyAuthCode(req, res, next) {
  try {
    const { idUser, code } = req.body;
    if (!idUser || !code)
      throw new BadRequestError("Dados do usuário não informados");

    // SERVICE
    await verifyAuthCode(idUser, code);

    res.status(201).json({ message: "email do usuário verificado" });
  } catch (error) {
    next(error);
  }
}

export { SendAuthCode, VerifyAuthCode };
