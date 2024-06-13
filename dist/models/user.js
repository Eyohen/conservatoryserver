'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
var RoleType;
(function (RoleType) {
    RoleType["User"] = "user";
    RoleType["Admin"] = "admin";
})(RoleType || (RoleType = {}));
module.exports = (sequelize, DataTypes) => {
    class User extends sequelize_1.Model {
        static associate(models) {
            // define association here
            User.belongsToMany(models.Project, {
                through: 'ProjectAssignments',
                foreignKey: 'userId'
            }),
                User.belongsTo(models.Booking, {
                    foreignKey: 'bookingId'
                });
        }
    }
    ;
    User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        role: {
            type: DataTypes.ENUM,
            values: Object.values(RoleType),
            allowNull: false,
            defaultValue: RoleType.User,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
