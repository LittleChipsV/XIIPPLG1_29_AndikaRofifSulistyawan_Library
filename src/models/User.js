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
        as: 'reviews',
        onDelete: 'CASCADE'
      });
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING(255),
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
      modelName: "User",
      tableName: "users",
      underscored: true,
      timestamps: false,
    }
  );

  return User;
};