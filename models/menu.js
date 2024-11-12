'use strict';


const {Model, UUIDV4} = require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class Menu extends Model{
   
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

 
    static associate(models) {
      // define association here
//       Booking.hasOne(models.Payment, {
//         foreignKey: 'bookingId',
//         as: 'Payment'
//       }
//   ),
//   Booking.hasOne(models.User, {
//     foreignKey: 'bookingId',
//     as: 'User'
//   }
// )
    }
  }
  Menu.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
      // autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      description: {
          type: DataTypes.STRING,
          allowNull: false
        },
      imageUrl: {
          type: DataTypes.STRING,
          allowNull: true
        },

    savoury : {
      type: DataTypes.STRING,
      allowNull:false,
    },
    semiSweet : {
      type: DataTypes.STRING,
      allowNull:false,
    },
    dessert : {
      type: DataTypes.STRING,
      allowNull:false,
    },
    // crockery: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     defaultValue:"Standard",
    //   },
    menu: {
        type: DataTypes.STRING,
        allowNull: true
      },

  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};