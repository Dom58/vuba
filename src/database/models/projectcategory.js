export default (sequelize, DataTypes) => {
  const ProjectCategory = sequelize.define(
    'ProjectCategory', 
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        allowNull: false,
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: 'project_categories',
    }
  );
  ProjectCategory.associate = function(models) {
    // ProjectCategory.hasMany(models.ProjectSubmition, {
    //   as: 'project',
    //   foreignKey: 'category_id',
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    // });
  };
  return ProjectCategory;
};
