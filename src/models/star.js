'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Star extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    Star.belongsTo(models.Product, { foreignKey: "product_id", targetKey: "id", as: 'starall' })
    }
  };
    Star.init({
    product_id:DataTypes.INTEGER,
    star: DataTypes.INTEGER,
  }, {
    sequelize,
    freezeTableName:true
  });
  return Star;
};