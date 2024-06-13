'use strict';


import {Model, UUIDV4} from 'sequelize';



interface CrockeryAttributes {
  id: string;
 crockery:string;
 imageUrl: string;
 description:string;


}


module.exports = (sequelize : any, DataTypes : any) => {
  class Crockery extends Model<CrockeryAttributes>
  implements CrockeryAttributes {
   
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    crockery!:string;
    imageUrl!: string;
    description!: string;
 
    static associate(models:any) {
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
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
      // autoIncrement: true
    },
    crockery:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:"Standard",
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false,
  },
    
     
  }, {
    sequelize,
    modelName: 'Crockery',
  });
  return Crockery;
};