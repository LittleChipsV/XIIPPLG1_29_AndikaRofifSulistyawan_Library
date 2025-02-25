"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
  */
  class Loan extends Model {
    static associate(models) {
      Loan.belongsTo(models.Book, {
        foreignKey: "book_id",
        as: "book",
        onDelete: "CASCADE",
      });

      Loan.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "CASCADE",
      });
    }
  }

  Loan.init(
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
          notNull: false
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
      loan_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: true,
          isDate: true,
        },
      },
      return_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isDate: true,
        },
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
        defaultValue: "Dipinjam"
      },
    },
    {
      sequelize,
      tableName: "loans",
      underscored: true,
      timestamps: false,
    }
  );

  return Loan;
};