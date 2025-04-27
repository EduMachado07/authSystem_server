import express from "express";
import { authRoute } from "./src/routes/auth.routes.js";
import { alterUser } from "./src/routes/alterUser.routes.js";
import { ErrorMiddleware } from "./src/middlewares/errors.middlewares.js";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(cookieParser());
// MIDDLEWARE PARA CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/user", alterUser);

app.use(ErrorMiddleware);
