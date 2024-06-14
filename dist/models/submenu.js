'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class SubMenu extends sequelize_1.Model {
        static associate(models) {
            // define association here
            SubMenu.belongsTo(models.Menu, {
                foreignKey: 'menuId'
            });
        }
    }
    SubMenu.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true,
            // autoIncrement: true
        },
        dessert: {
            type: DataTypes.STRING,
            allowNull: false
        },
        semi_sweet: {
            type: DataTypes.STRING,
            allowNull: false
        },
        savory: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'SubMenu',
    });
    return SubMenu;
};
