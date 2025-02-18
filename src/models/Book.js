"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "SET NULL",
      });

      Book.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
        onDelete: "CASCADE",
      });

      Book.hasMany(models.Loan, {
        foreignKey: "book_id",
        as: "loans",
        onDelete: "CASCADE",
      });

      Book.hasMany(models.Review, {
        foreignKey: "book_id",
        as: "reviews",
        onDelete: "CASCADE",
      });
    }
  }

  Book.init(
    {
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      writer: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      publisher: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
          isInt: true,
          max: new Date().getFullYear(),
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "categories",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Book",
      tableName: "books",
      underscored: true,
      timestamps: false,
    }
  );

  return Book;
};