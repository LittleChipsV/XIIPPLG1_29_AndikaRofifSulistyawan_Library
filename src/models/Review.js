"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
  */
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.Book, {
        foreignKey: "book_id",
        as: "book",
        onDelete: "CASCADE",
      });

      Review.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "CASCADE"
      });
    }
  }

  Review.init(
    {
      rating: {
        type: DataTypes.TINYINT,
        allowNull: false,
        validate: {
          notNull: true,
          min: 1,
          max: 5,
        },
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Review",
      tableName: "reviews",
      underscored: true,
      timestamps: false,
    }
  );

  return Review;
};