'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
     
    }
  };
    Comment.init({
   name:DataTypes.STRING,
     description: DataTypes.STRING,
      custumer_id: DataTypes.INTEGER,
        product_id: DataTypes.INTEGER,
       raiting: DataTypes.INTEGER,
      image: DataTypes.BLOB("long"),
       now: DataTypes.STRING,
  }, {
    sequelize,
    freezeTableName:true
  });
  return Comment;
};