import { BadRequestError } from "../config/classErrors.config.js";
import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function sendEmail(email, code, urlUser) {
  const linkVerification = `${process.env.CLIENT_VERIFY_CODE}?token=${urlUser}`;
  try {
    await transporter.sendMail({
      from: "Eduardo Machado <onboarding@resend.dev>",
      to: email,
      subject: "Seja bem vindo!",
      html: `
        <table role="presentation" style="width: 100%; background-color: #f1f1f1; padding: 40px 0;">
            <tr>
                <td align="center">
                    <table role="presentation" style="width: 700px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); padding: 50px 30px; text-align: center;">
                        <tr>
                            <td>
                                <h1 style="color: #27476e; margin: 0;">Autenticação da conta</h1>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p style="font-size: 17px; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; margin: 20px 0 0; text-align: left;">Recebemos os seus dados e estamos a um passo de finalizar o processo. Nos informe o código abaixo para que possamos liberar o seu acesso em nosso sistema.</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 20px 0;">
                                <p style="letter-spacing: 4px; font-size: 40px; font-weight: 700; padding: 0px 5px; color: #27476e; margin: 0;">${code}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a href="${linkVerification}" style="text-decoration: none; cursor: pointer;">
                                    <button style="padding: 12px 25px; border: none; border-radius: 4px; background-color: #27476e; color: #fff; font-size: 15px; font-weight: 600; cursor: pointer;">
                                        Liberar acesso
                                    </button>
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
                `,
    });
  } catch (error) {
    throw new BadRequestError("erro ao enviar email: " + error.message);
  }
}

export default sendEmail;
