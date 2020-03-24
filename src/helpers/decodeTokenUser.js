import 'dotenv/config';
import { decode as decodeToken } from '../utils/tokens';
import { User, Role } from '../database/models';

/**
 * Handle attach token
 * @param {request} request - Express Request
 * @returns {any} - Returns undefined or user data
 */
const decodeTokenUser = async request => {
  const Authorization = request && request.get('token');

  if (!Authorization) {
    return undefined;
  }

  const token = Authorization.replace('Bearer ', '');

  const decoded = decodeToken(token);

  if (decoded && !decoded.error) {
    const foundUser = await User.findOne({
      where: {
        id: decoded.id,
      },
      include: [
        {
          model: Role,
          as: 'roles',
        },
      ],
    });
    return foundUser;
  }
  return undefined;
};

export default decodeTokenUser;
