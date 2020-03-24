import { AuthenticationError } from 'apollo-server';

import { NOT_AUTHORIZED } from '../constants/errorMessages';
import { UserRole, Role } from 'database/models';

/**
 * Check if user is an admin
 * @param {object} user,
 * @param {sting} language,
 * @returns {object} decoded token
 */
const isAdmin = async (user, language) => {
  try {
    const userRole = await UserRole.findOne({
      where: {
        userId: user.id,
      },
      include: [{ model: Role, as: 'role' }],
    });
    if (userRole.role.name !== 'admin') {
      throw new AuthenticationError(NOT_AUTHORIZED(language));
    }
    return true;
  } catch (error) {
    throw new AuthenticationError(NOT_AUTHORIZED(language));
  }
};

export default isAdmin;
