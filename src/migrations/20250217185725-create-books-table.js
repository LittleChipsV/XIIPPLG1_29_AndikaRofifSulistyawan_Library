"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("books", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      writer: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      publisher: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "users", key: "id" },
        onDelete: "SET NULL",
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "categories", key: "id" },
        onDelete: "CASCADE",
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("books");
  },
};