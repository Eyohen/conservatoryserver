'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Payment extends sequelize_1.Model {
        static associate(models) {
            //define association here
            Payment.belongsTo(models.Booking, {
                foreignKey: 'bookingId'
            });
        }
    }
    Payment.init({
        transactionRefId: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
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
