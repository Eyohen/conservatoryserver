'use strict';


const {Model, UUIDV4} = require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class Crockery extends Model{

 
    static associate(models) {
      // define association here

    }
  }
  Crockery.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
      // autoIncrement: true
    },
    crockery: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },

  }, {
    sequelize,
    modelName: 'Crockery',
  });
  return Crockery;
};