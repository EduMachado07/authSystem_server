import { Sequelize } from "sequelize";

const database = new Sequelize("prj_Authenticator", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default database;
