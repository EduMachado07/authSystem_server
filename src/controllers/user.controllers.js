import { BadRequestError } from "../config/classErrors.config.js";
import {
  newPassword,
  newEmail,
  newPhones,
  getUser,
  deleteUser,
  newNameUser,
} from "../services/user.services.js";
// UPDATE NAME USER
async function AlterNameUser(req, res, next) {
  try {
    const { email, nameUser } = req.body;
    if (!email || !nameUser) throw new BadRequestError("Dados não informados");

    // FUNCAO PARA ALTERAR NOME DE USUARIO
    const user = await newNameUser(email, nameUser);

    res.status(201).json({ message: "Nome do usuario alterado" });
  } catch (error) {
    next(error);
  }
}
// UPDATE EMAIL
async function AlterEmail(req, res, next) {
  try {
    const { email, newAdressEmail } = req.body;
    if (!email || !newAdressEmail)
      throw new BadRequestError("Dados não informados");

    // FUNCAO PARA ALTERAR EMAIL DO USUARIO
    const user = await newEmail(email, newAdressEmail);

    res.status(201).json({ message: "Email do usuario alterado" });
  } catch (error) {
    next(error);
  }
}
// UPDATE PASSWORD
async function AlterPassword(req, res, next) {
  try {
    const { token, password } = req.body;
    if (!token || !password) throw new BadRequestError("Dados não informados");

    // FUNCAO PARA ALTERAR SENHA DO USUARIO
    const user = await newPassword(email, password);

    res.status(201).json({ message: "Senha do usuário alterada" });
  } catch (error) {
    next(error);
  }
}
// UPDATE PHONES
async function AlterPhones(req, res, next) {
  try {
    const { email, firstPhoneNumber, secondPhoneNumber } = req.body;
    if (!email) throw new BadRequestError("Dados não informados");

    // FUNCAO PARA ALTERAR TELEFONES
    await newPhones(email, firstPhoneNumber, secondPhoneNumber);

    res.status(201).json({ message: "Telefones do usuário alterados" });
  } catch (error) {
    next(error);
  }
}
// USER SEARCH
async function DataUser(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) throw new BadRequestError("Dados não informados");
    // FUNCAO DE BUSCA DE DADOS DO USUARIO
    const user = await getUser(email);

    res.status(201).json({ message: "Usuário encontrado", user });
  } catch (error) {
    next(error);
  }
}
// DELETE USER
async function DeleteUser(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) throw new BadRequestError("Dados não informados");
    // FUNCAO PARA DELETAR CONTA DO USUARIO
    await deleteUser(email);

    res.status(201).json({ message: "Usuário removido do sistema" });
  } catch (error) {
    next(error);
  }
}

export {
  AlterPassword,
  AlterEmail,
  AlterPhones,
  AlterNameUser,
  DataUser,
  DeleteUser,
};
