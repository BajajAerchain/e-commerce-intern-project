'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({carts,history,category}) {
      // define association here
      this.hasOne(carts,{foreignKey:'productId'})
      this.hasOne(history,{foreignKey:'productId'})
      this.belongsTo(category,{foreignKey:'categoryId'})
    }
    //hides id from end user
    toJSON(){
      return {...this.get(), id:undefined}
    }
  }
  product.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false
    },
    // categoryId: {
    //   type:DataTypes.INTEGER,
    //   allowNull:false
    // },
    price: {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    tableName:'products',
    modelName: 'product',
  });
  return product;
};