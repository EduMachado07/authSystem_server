import express from "express";
import {
  AlterEmail,
  AlterNameUser,
  AlterPassword,
  AlterPhones,
  DataUser,
  DeleteUser,
} from "../controllers/user.controllers.js";
import authCookie from "../middlewares/authCookie.middlewares.js";

export const alterUser = express.Router();

alterUser.post("/alter-email", authCookie, AlterEmail);
alterUser.post("/alter-nameUser", authCookie, AlterNameUser);
alterUser.post("/alter-password", AlterPassword);
// alterUser.post("/alter-password", authCookie, AlterPassword);
alterUser.post("/alter-phone", authCookie, AlterPhones);

alterUser.get("/", authCookie, DataUser);
alterUser.delete("/", authCookie, DeleteUser);
