import { Phone, User } from "../models/user.models.js";
import { BadRequestError } from "../config/classErrors.config.js";
import { sendEmailCode } from "./authCode.services.js";
import bcrypt from "bcrypt";

async function newNameUser(email, nameUser) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new BadRequestError("usuário não encontrado");

  if (user.nameUser === nameUser) {
    throw new BadRequestError("O novo nome de usuário é igual ao atual");
  }

  user.nameUser = nameUser;
  await user.save();

  return user;
}
async function newEmail(email, newAdressEmail) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new BadRequestError("Usuário não encontrado");

  // VERIFICA SE O NOVO EMAIL JÁ EXISTE NO BANCO DE DADOS
  const existingUser = await User.findOne({ where: { email: newAdressEmail } });
  if (existingUser) {
    throw new BadRequestError(
      "Este e-mail já está sendo utilizado por outro usuário"
    );
  }

  if (user.email === newAdressEmail) {
    throw new BadRequestError("O novo e-mail é igual ao atual");
  }

  user.email = newAdressEmail;
  user.emailActive = false;
  await user.save();

  // await sendEmailCode(newAdressEmail);

  return user;
}
async function newPassword(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new BadRequestError("usuário não encontrado");

  const isSamePassword = await bcrypt.compare(password, user.password);
  if (isSamePassword) {
    throw new BadRequestError("A nova senha é igual a atual");
  }

  const newHashPassword = await bcrypt.hash(
    password,
    Number(process.env.SALT_ROUNDS)
  ); // HASH DA SENHA

  user.password = newHashPassword;
  await user.save();

  return user;
}
async function newPhones(email, firstPhoneNumber, secondPhoneNumber) {
  // PROCURA USUARIO
  const user = await User.findOne({ where: { email } });
  if (!user) throw new BadRequestError("usuário não encontrado");

  // PROCURA OS TELEFONES EM ORDEM
  const phones = await Phone.findAll({
    where: { userId: user.id },
    order: [["id", "ASC"]],
  });

  // VERIFICA SE EXISTEM DOIS TELEFONES
  if (phones.length < 2) {
    throw new BadRequestError("O usuário não possui telefones cadastrados.");
  }

  // ATUALIZA OS TELEFONES
  if (phones[0]) {
    phones[0].phoneNumber = firstPhoneNumber || null;
    await phones[0].save();
  }
  if (phones[1]) {
    phones[1].phoneNumber = secondPhoneNumber || null;
    await phones[1].save();
  }

  return user;
}
async function getUser(email) {
  // PROCURA USUARIO
  const user = await User.findOne({
    where: { email },
    include: {
      model: Phone,
    },
  });
  if (!user) throw new BadRequestError("usuário não encontrado");

  return user;
}
async function deleteUser(email) {
  // PROCURA USUARIO
  const user = await User.findOne({ where: { email } });
  if (!user) throw new BadRequestError("usuário não encontrado");

  // REMOVE USUARIO DO BANCO DE DADOS
  await Phone.destroy({ where: { userId: user.id } });
  await user.destroy();

  return user;
}
export { newNameUser, newPassword, newEmail, newPhones, getUser, deleteUser };
