export default (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    'UserRole',
    {
      userId: DataTypes.INTEGER,
      roleId: DataTypes.INTEGER,
    },
    {
      tableName: 'users_roles',
    },
  );
  UserRole.associate = models => {
    UserRole.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    UserRole.belongsTo(models.Role, {
      as: 'role',
      foreignKey: 'roleId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };
  return UserRole;
};
