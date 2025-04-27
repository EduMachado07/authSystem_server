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

authRoute.post("/register", Register);
authRoute.post("/login", Login);
authRoute.post("/send-code", SendAuthCode);
authRoute.post("/verify-code", VerifyAuthCode);
authRoute.post("/alter-password", VerifyEmail);
