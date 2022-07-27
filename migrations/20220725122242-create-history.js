'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('order_history', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      // product_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false
      // },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue:1
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      total: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order_history');
  }
};