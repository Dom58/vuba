export default (sequelize, DataTypes) => {
  const ProjectSubmition = sequelize.define(
    'ProjectSubmition', 
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telephone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      projectName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      companyAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: 'project_submitions',
    },
  );
  ProjectSubmition.associate = function(models) {
    ProjectSubmition.belongsTo(models.ProjectCategory, {
      as: 'category',
      foreignKey: 'category_id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };
  return ProjectSubmition;
};
