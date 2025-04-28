import { DataTypes } from "sequelize";
import database from "../config/database.config.js";

// USER
export const User = database.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nameUser: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  verificationCode: {
    type: DataTypes.INTEGER,
  },
});
// PHONES
export const Phone = database.define(
  "phone",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ["id", "userId", "createdAt", "updatedAt"] },
    },
  }
);
// USER TOKEN
export const UrlVerificationToken = database.define("UrlVerificationToken", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // expiresAt: {
  //   type: DataTypes.DATE,
  //   allowNull: false,
  // },
});

// RELATIONSHIPS
// user and phone
User.hasMany(Phone, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Phone.belongsTo(User, {
  foreignKey: "userId",
});
// user and token
User.hasMany(UrlVerificationToken, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
UrlVerificationToken.belongsTo(User, {
  foreignKey: "userId",
});
