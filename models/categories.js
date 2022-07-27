'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({product}) {
      // define association here
      this.hasMany(product,{foreignKey:'categoryId'})
    }
  }
  category.init({
    categoryName: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    tableName: 'categories',
    modelName: 'category',
  });
  return category;
};