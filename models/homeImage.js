'use strict';


const {Model, UUIDV4} = require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class HomeImage extends Model{

 
    static associate(models) {
      // define association here

    }
  }
  HomeImage.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
      // autoIncrement: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },

  }, {
    sequelize,
    modelName: 'HomeImage',
  });
  return HomeImage;
};