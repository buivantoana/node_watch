'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Product', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
        },
      
       productname: {
        type: Sequelize.STRING
      },
     brand_id: {
        type: Sequelize.INTEGER
      },
    
      category_id: {
        type: Sequelize.INTEGER
      },
    
       productdes: {
        type: Sequelize.TEXT("long")
      },
         price: {
        type: Sequelize.FLOAT
        },
          image: {
        type: Sequelize.BLOB("long")
        },
           type: {
        type: Sequelize.INTEGER
      },
    
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Product');
  }
};