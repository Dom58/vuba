export default (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      tableName: 'roles',
    },
  );
  Role.associate = models => {
    Role.belongsToMany(models.User, {
      through: models.UserRole,
      as: 'users',
      foreignKey: 'roleId',
    });
  };
  return Role;
};
