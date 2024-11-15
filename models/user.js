'use strict';

const { Model, UUIDV4 } = require('sequelize');

const RoleType = {
  User: 'user',
  Admin: 'admin',
};

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    //   User.belongsToMany(models.Project, {
    //     through: 'ProjectAssignments', 
    //     foreignKey: 'userId'
    //   });
      User.hasMany(models.Booking, {
        foreignKey: 'userId',
        as:'Bookings'
      });
    }
  }

  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
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