'use strict';


import {Model, UUIDV4} from 'sequelize';

interface MenuAttributes {
  id: string;
  title:string;
  description: string;
  price: number;
  imageUrl: string;

}


module.exports = (sequelize : any, DataTypes : any) => {
  class Menu extends Model<MenuAttributes>
  implements MenuAttributes {
   
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    title!: string;
    description!: string;
    price!: number;
    imageUrl!: string;
 
    static associate(models:any) {
      // define association here
      Menu.hasOne(models.SubMenu, {
        foreignKey: 'menuId',
        as: 'subMenu'
      }
      )
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

  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};