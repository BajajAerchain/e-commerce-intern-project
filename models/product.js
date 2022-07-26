'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({carts,history}) {
      // define association here
      this.hasOne(carts,{foreignKey:'product_id'})
      this.hasOne(history,{foreignKey:'product_id'})
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
    category: {
      type:DataTypes.STRING
    },
    subcategory: {
      type:DataTypes.STRING
    },
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