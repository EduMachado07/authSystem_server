import { BadRequestError } from "../config/classErrors.config.js";
import {
  registerUser,
  loginUser,
  signTokenJwt,
  emailUser,
} from "../services/auth.services.js";

// REGISTER NEW USER
async function Register(req, res, next) {
  try {
    const { name, lastName, email, password } = req.body;
    if (!name || !lastName || !email || !password)
      throw new BadRequestError("Dados não informados");

    // SERVICE
    const user = await registerUser(name, lastName, email, password);

    // const { accessToken, refreshToken } = await signTokenJwt(email);
    // // ENVIA TOKENS COMO COOKIES
    // res.cookie("accessToken", accessToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    // });
    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 3 * 24 * 60 * 60 * 1000, // 3 dias
    //   sameSite: "Strict",
    // });

    res.status(201).json({ message: "usuário criado", user });
  } catch (error) {
    next(error);
  }
}
// LOGIN USER
async function Login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new BadRequestError("Dados não informados");

    // SERVICE
    const user = await loginUser(email, password);

    // SEND COOKIES WITH TOKEN
    // -- ACCESS TOKEN
    const { accessToken, refreshToken } = await signTokenJwt(email);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    // -- REFRESH TOKEN
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 dias
      sameSite: "Strict",
    });

    res.status(201).json({ message: "usuário entrou no sistema", user });
  } catch (error) {
    next(error);
  }
}
// VERIFY EMAIL USER
async function VerifyEmail(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) throw new BadRequestError("Dados não informados");

    // SERVICE
    const user = await emailUser(email);

    res.status(201).json({ message: "usuário criado", user });
  } catch (error) {
    next(error);
  }
}

export { Register, Login, VerifyEmail };
