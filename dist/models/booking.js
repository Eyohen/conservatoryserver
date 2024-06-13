'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Booking extends sequelize_1.Model {
        static associate(models) {
            // define association here
            Booking.hasOne(models.Payment, {
                foreignKey: 'bookingId',
                as: 'Payment'
            }),
                Booking.hasOne(models.User, {
                    foreignKey: 'bookingId',
                    as: 'User'
                });
        }
    }
    Booking.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
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
            defaultValue: "Standard",
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
