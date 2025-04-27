import database from "./database.config.js";

export const connectBd = async () => {
  try {
    await database.authenticate();

    await database.sync({ force: false });
    // await database.sync({ alter: true });

    console.log("--------");
    console.log("✅ Conexão com o MySQL estabelecida!");
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco:", error);
    process.exit(1);
  }
};
