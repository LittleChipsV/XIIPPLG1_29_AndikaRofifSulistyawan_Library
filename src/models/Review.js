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
      book_id: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: {
          model: 'books',
          key: 'id'
        },
        validate: {
          isInt: true, 
          notNull: true
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
          model: 'users',
          key: 'id' 
        },
        validate: {
          isInt: true,
          notNull: true
        }
      },
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
    },
    {
      sequelize,
      tableName: "reviews",
      underscored: true,
      updatedAt: false
    }
  );

  return Review;
};