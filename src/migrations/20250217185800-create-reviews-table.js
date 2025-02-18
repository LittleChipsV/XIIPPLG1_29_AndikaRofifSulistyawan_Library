"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("reviews", {
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
      rating: {
        type: Sequelize.TINYINT,
        allowNull: false,
        validate: { min: 1, max: 5 },
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("reviews");
  },
};