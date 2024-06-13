'use strict';


import {Model, UUIDV4} from 'sequelize';

interface ProjectAttributes {
  id: string;
  title:string;
 status: string;
}


module.exports = (sequelize : any, DataTypes : any) => {
  class Project extends Model<ProjectAttributes>
  implements ProjectAttributes {
   
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    title!: string;
    status!: string;
    static associate(models:any) {
      // define association here
      Project.belongsToMany(models.User, {
        through: 'ProjectAssignments',
        foreignKey: 'projectId'
      }
      )
    }
  }
  Project.init({
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
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};