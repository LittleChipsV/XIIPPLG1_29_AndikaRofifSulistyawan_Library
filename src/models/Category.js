"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
      Category.hasMany(models.Book, {
        foreignKey: "category_id",
        as: "books",
        onDelete: "CASCADE",
      });
    }
  }

  Category.init(
    {
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "categories",
      underscored: true,
      timestamps: false,
    }
  );

  return Category;
};