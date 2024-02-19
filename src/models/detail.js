'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Detail.belongsTo(models.Product, { foreignKey: "product_id", targetKey: "id", as: 'productall' })
    }
  };
  Detail.init({
    product_id: DataTypes.INTEGER,
  
      image: DataTypes.BLOB("long"),
  }, {
    sequelize,
    freezeTableName:true
  });
  return Detail;
};