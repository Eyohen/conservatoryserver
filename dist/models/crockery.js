'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Crockery extends sequelize_1.Model {
        static associate(models) {
            // define association here
            //   SubMenu.belongsTo(models.Menu, {
            //    // through: 'menuAssignments',
            //     foreignKey: 'submenuId'
            //   }
            //   )
        }
    }
    Crockery.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true,
            // autoIncrement: true
        },
        crockery: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Standard",
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Crockery',
    });
    return Crockery;
};
