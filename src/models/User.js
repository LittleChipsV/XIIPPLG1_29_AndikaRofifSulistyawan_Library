const { comparePassword, hashPassword } = require('../utils/passwordHelper');

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Book, {
        foreignKey: "user_id",
        as: "books",
        onDelete: "SET NULL",
      });

      User.hasMany(models.Loan, {
        foreignKey: "user_id",
        as: "loans",
        onDelete: "CASCADE",
      });

      User.hasMany(models.Review, {
        foreignKey: "user_id",
        as: "reviews",
        onDelete: "CASCADE",
      });

      User.hasOne(models.UserRefreshToken),{
        foreignKey: "user_id",
        as: "refresh_token",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      };
    }

    async isValidPassword(password) {
      return await comparePassword(password, this.password);
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: true,
          notEmpty: true,
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "users",
      underscored: true,
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      scopes: {
        withPassword: {
          attributes: {
            include: ["password"],
          },
        },
      },
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await hashPassword(user.password);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            user.password = await hashPassword(user.password);
          }
        },
      },
    }
  );

  return User;
};
