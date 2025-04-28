import { User, Phone, UrlVerificationToken } from "../models/user.models.js";
import { BadRequestError } from "../config/classErrors.config.js";
import { sendEmailCode } from "./authCode.services.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER NEW USER
async function registerUser(name, lastName, email, password) {
  // VERIFY ACCOUNT
  const user = await User.findOne({ where: { email } });
  if (user) throw new BadRequestError("Usuário já cadastrado no nosso sistema");

  const hashPassword = await bcrypt.hash(
    password,
    Number(process.env.SALT_ROUNDS)
  );

  const newUser = await User.create({
    name,
    lastName,
    nameUser: `${name} ${lastName}`,
    email,
    password: hashPassword,
  });

  // CREATE PHONES
  await Phone.create({ phoneNumber: null, userId: newUser.id });
  await Phone.create({ phoneNumber: null, userId: newUser.id });

  // SEND CODE TO EMAIL
  await sendEmailCode(newUser.id);

  return newUser.id;
}
// LOGIN
// VERIFY EMAIL AND PASSWORD
async function loginUser(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user)
    throw new BadRequestError("Usuário não encontrado em nosso sistema");

  const passwordVerified = await bcrypt.compare(password, user.password);
  if (!passwordVerified) throw new BadRequestError("Senha incorreta");

  const returnUser = await User.findOne({
    where: { email },
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
// TOKEN SIGNATURE
async function signTokenJwt(email) {
  const secretAccess = process.env.JWT_SECRET_ACCESS;
  const secretRefresh = process.env.JWT_SECRET_REFRESH;

  if (!secretAccess | !secretRefresh)
    throw new BadRequestError("As chaves token não foram definidas");

  const accessToken = jwt.sign({ email }, secretAccess, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ email }, secretRefresh, { expiresIn: "3d" });

  return { accessToken, refreshToken };
}
// VERIFY EMAIL USER
async function emailUser(email) {
  const user = await User.findOne({ where: { email } });
  if (!user)
    throw new BadRequestError("Usuário não encontrado em nosso sistema");

  // SERVICE
  // SEND CODE TO EMAIL
  await sendEmailCode(email);

  return user.id;
}

export { registerUser, loginUser, signTokenJwt, emailUser };
