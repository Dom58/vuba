import bcrypt from 'bcryptjs';
import { SALT_ROUNDS } from 'constants/general';
import { INVALID_EMAIL, EMAIL_REQUIRED } from 'constants/errorMessages';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
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
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: EMAIL_REQUIRED(),
          },
          isEmail: {
            args: true,
            msg: INVALID_EMAIL(),
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
      },
      bio: {
        type: DataTypes.TEXT,
      },
      emailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'users',
      paranoid: true,
    },
  );
  User.associate = models => {
    User.belongsToMany(models.Role, {
      through: models.UserRole,
      as: 'roles',
      foreignKey: 'userId',
    });
    
  };

  User.beforeCreate(async user => {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  });

  User.prototype.comparePassword = async function comparePassword(password) {
    return bcrypt.compare(password, this.get().password);
  };

  User.prototype.findByEmail = email => {
    return User.findOne({ where: { email } });
  };

  User.prototype.hasRoles = function hasRoles(
    roles = [],
    allRolesRequired = false,
  ) {
    if (!allRolesRequired) {
      return (this.roles || []).some(role => roles.includes(role.name));
    }

    const getRolesByName = (this.roles || []).map(role => role.name);
    return roles.every(role => getRolesByName.includes(role));
  };

  return User;
};
