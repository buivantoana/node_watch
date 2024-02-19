'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.Detail, { foreignKey: "product_id", as: 'productall' })
      Product.hasMany(models.Star, { foreignKey: "product_id", as: 'starall' })
    }
  };
  Product.init({
    productname: DataTypes.INTEGER,
    brand_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
     productdes:DataTypes.TEXT("long"),
      price: DataTypes.FLOAT,
      type: DataTypes.INTEGER,
      image: DataTypes.BLOB("long"),
  }, {
    sequelize,
     freezeTableName:true
  });
  return Product;
};