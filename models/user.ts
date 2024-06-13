'use strict';

import {Model, UUIDV4} from 'sequelize';

enum RoleType {
  User = 'user',
  Admin = 'admin',
 
}

interface UserAttributes {
  id: string;
  firstName:string;
  lastName:string;
  email: string;
  role: string;
  password: string;
}


module.exports = (sequelize:any, DataTypes: any) => {
  class User extends Model<UserAttributes> 
  implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    firstName!:string;
    lastName!:string;
    email!:string;
    role!:string;
    password!:string;

    static associate(models:any) {
      // define association here
      User.belongsToMany(models.Project, {
        through: 'ProjectAssignments', 
        foreignKey: 'userId'
      }),
      User.belongsTo(models.Booking, {
        foreignKey: 'bookingId'
      }
      )
    }
  };
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
      type:DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    role:{
      type: DataTypes.ENUM,
      values:Object.values(RoleType),
      allowNull:false,
      defaultValue:RoleType.User,
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