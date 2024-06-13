'use strict';


import {Model, UUIDV4} from 'sequelize';



interface BookingAttributes {
  id: string;
 email:string;
 time:string;
 price:number;
 crockery:string;
 menu:string;
 date:string;

}


module.exports = (sequelize : any, DataTypes : any) => {
  class Booking extends Model<BookingAttributes>
  implements BookingAttributes {
   
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    email!:string;
    time!:string;
    price!:number;
    crockery!:string;
    menu!:string;
    date!:string;
 
    static associate(models:any) {
      // define association here
      Booking.hasOne(models.Payment, {
        foreignKey: 'bookingId',
        as: 'Payment'
      }
  ),
  Booking.hasOne(models.User, {
    foreignKey: 'bookingId',
    as: 'User'
  }
)
    }
  }
  Booking.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
      // autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
      },
    time: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
    crockery: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:"Standard",
      },
    menu: {
        type: DataTypes.STRING,
        allowNull: false
      },
    date: {
          type: DataTypes.DATE,
          allowNull: false
        },
     

  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};