import express from "express";

import {
  Register,
  Login,
  VerifyEmail,
} from "../controllers/auth.controllers.js";
import {
  SendAuthCode,
  VerifyAuthCode,
} from "../controllers/authCode.controllers.js";

export const authRoute = express.Router();

// REGISTER NEW USER
authRoute.post("/register", Register);
// LOGIN
authRoute.post("/login", Login);
// VERIFY EMAIL USER
authRoute.post("/verify-email", VerifyEmail);
// VERIFY CODE USER
authRoute.post("/verify-code", VerifyAuthCode);
// SEND CODE USER
authRoute.post("/send-code", SendAuthCode);
