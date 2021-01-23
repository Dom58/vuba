import 'dotenv/config';
import { AuthenticationError } from 'apollo-server';

import { NOT_AUTHENTICATED } from '../constants/errorMessages';

/**
 * Handle authentication
 */
/**
 * Check if user is authenticated
 * @param {object} user,
 * @param {sting} language,
 * @returns {object} decoded token
 */
export const isAuth = (user, language) => {
  if (!user) {
    throw new AuthenticationError(NOT_AUTHENTICATED(language));
  }
};

export const isAdmin = (user, language) => {
  if (!user) {
    throw new AuthenticationError(NOT_AUTHENTICATED(language));
  }
  
  if (user.get().role !== 'admin') {
    throw new AuthenticationError('Access Denied!');
  }
};
