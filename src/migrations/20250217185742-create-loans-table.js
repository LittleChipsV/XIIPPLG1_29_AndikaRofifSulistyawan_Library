"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("loans", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      book_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "books", key: "id" },
        onDelete: "CASCADE",
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      loan_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      return_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("loans");
  },
};