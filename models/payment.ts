'use strict';


import {Model, UUIDV4} from 'sequelize';



interface PaymentAttributes {
  transactionRefId: string;
  amount:number;



}


module.exports = (sequelize : any, DataTypes : any) => {
  class Payment extends Model<PaymentAttributes>
  implements PaymentAttributes {
   
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    transactionRefId!:string;
    amount!:number;

 
    static associate(models:any) {
      //define association here
      Payment.belongsTo(models.Booking, {
        foreignKey: 'bookingId'
      }
      )
    }
  }
  Payment.init({
    transactionRefId: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
      // autoIncrement: true
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
      },

  

  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};