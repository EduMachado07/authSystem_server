import { app } from "./app.js";
import { connectBd } from "./src/config/connectBd.config.js";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT_SERVER;

(async () => {
  try {
    await connectBd();

    app.listen(port, () => {
      console.log(`App de exemplo esta rodando na porta ${port}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
})();
