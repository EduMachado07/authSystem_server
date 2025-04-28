import { User, Phone } from "../models/user.models.js";
import sendEmail from "../middlewares/sendEmail.middlewares.js";
import {
  BadRequestError,
  UnauthorizedError,
} from "../config/classErrors.config.js";
// import crypto from "crypto";

// CREATE AND SEND CODE
async function sendEmailCode(id) {
  const user = await User.findOne({ where: { id } });

  if (!user) throw new Error("Usuário não encontrado");

  // CREATE CODE
  const generateCode = () =>
    Math.floor(100000 + Math.random() * 900000).toString();
  const verificationCode = generateCode();

  user.verificationCode = verificationCode;
  await user.save();

  // MIDDLEWARE SEND CODE TO EMAIL
  await sendEmail(user.email, verificationCode, user.id);

  return;
}

// VERIFIY CODE
async function verifyAuthCode(idUser, code) {
  // VERIFY ACCOUNT
  const user = await User.findOne({ where: { id: idUser } });

  if (!user) throw new BadRequestError("Usuário não encontrado");
  // if (user.emailActive) throw new BadRequestError("Email já está ativo");
  if (user.verificationCode !== parseInt(code))
    throw new UnauthorizedError("Código informado está incorreto");

  user.verificationCode = null;
  await user.save();

  const returnUser = await User.findOne({
    where: { id: idUser },
    attributes: ["id", "email", "nameUser"],
    include: [
      {
        model: Phone,
        attributes: ["phoneNumber"],
      },
    ],
  });

  return returnUser;
}

export { verifyAuthCode, sendEmailCode };
