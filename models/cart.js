'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({product}) {
      // define association here
      this.belongsTo(product,{foreignKey:'productId'})
    }
  }
  carts.init({
    // productId: {
    //   type:DataTypes.INTEGER,
    //   allowNull:false
    // },
    product_name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    quantity: {
      type:DataTypes.INTEGER,
      defaultValue:1
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    active:{
      type: DataTypes.BOOLEAN,
      allowNull:false
    },
    total: {
      type:DataTypes.BIGINT,
      allowNull:false
    }
  }, {
    sequelize,
    tableName: 'cart',
    modelName: 'carts',
  });
  return carts;
};