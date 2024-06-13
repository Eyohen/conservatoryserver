'use strict';


import {Model, UUIDV4} from 'sequelize';

interface SubMenuAttributes {
  id: string;
 dessert:string;
 semi_sweet:string;
 savory:string;

}


module.exports = (sequelize : any, DataTypes : any) => {
  class SubMenu extends Model<SubMenuAttributes>
  implements SubMenuAttributes {
   
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    dessert!:string;
    semi_sweet!:string;
    savory!:string;
 
    static associate(models:any) {
      // define association here
      SubMenu.belongsTo(models.Menu, {
        foreignKey: 'menuId'
      }
      )
    }
  }
  SubMenu.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
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