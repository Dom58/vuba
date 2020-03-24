import {
  AuthenticationError,
  UserInputError,
  ApolloError,
} from 'apollo-server';

import getPagination from '../helpers/getPagination';
import translate from '../locales';
import { User, Role } from '../database/models';
import errorHandler from '../helpers/errorHandler';
import {
  generate as generateToken,
  decode as decodeToken,
} from '../utils/tokens';
import {
  USER_NOT_FOUND,
  ACCOUNT_NOT_VERIFIED,
  INVALID_PASSWORD,
  NOT_DELETED,
  PASSWORD_NOT_MATCH,
  INVALID_TOKEN,
} from 'constants/errorMessages';

import {
  ACCOUNT_VERIFIED,
  SUCCESSFULLY_DELETED,
  SUCCESS_TO_RESET_PASSWORD,
  SUCCESS_PASSWORD_RESET,
} from 'constants/successMessages';
import { HTTP_NOT_FOUND } from 'constants/httpStatusCodes';
import { hashPassword } from '../utils/password';

/**
 * User Controllers
 */
export default class UserController {
  /**
   * Create the user account
   * @param {object} data data containing user information(firstName:str, middleName:str, lastName:str, email:str, password:str)
   * @returns {string|object} user payload
   */
  static async create(data, { language }) {
    try {
      const user = await User.create(data);
      delete user.dataValues.password;
      return {
        message: 'User Created Successfully',
        token: generateToken(user.get()),
        user,
      };
    } catch (err) {
      const error = errorHandler(err, language);
      throw new ApolloError(error.message, error.code, error);
    }
  }

  /**
   * Signin the user
   * @param {object} data data containing user information(email:str, password:str)
   * @param {object} context
   * @returns {string|object} user payload token
   */
  static async login({ email, password }, { language }) {
    const user = await User.findOne({
      where: { email },
      include: [{ model: Role, as: 'roles' }],
    });
    if (!user) {
      throw new UserInputError(USER_NOT_FOUND(language));
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new AuthenticationError(INVALID_PASSWORD(language));
    }

    delete user.dataValues.password;
    return {
      token: generateToken({ 
        id: user.get().id, 
        email: user.get().email, 
        fullName: user.get().fullName,
        role: user.get().role,
      }),
      // user: { user, roles: user.roles.map(role => role.get().name) },
      user,
    };
  }

  /**
   * Retrieve user by email
   * @param {object} args - the query arguments
   * @returns {Promise} - Returns
   */
  static async getAll(args = {}) {
    const { page, perPage, ...condition } = args;
    const pagination = getPagination(page, perPage);
    const users = await User.findAndCountAll({
      where: condition,
      ...pagination,
    });

    return {
      data: users.rows,
      meta: {
        page: page || 1,
        perPage: pagination.limit,
        total: users.count,
      },
    };
  }

  /**
   * Retrieve user by email
   * @param {object} condition - the condition
   * @returns {Promise} - Returns
   */
  static async getOne(condition) {
    const user = await User.findOne({
      where: condition,
      include: [{ model: Role, as: 'roles' }],
    });
    if (user && user.get()) {
      delete user.dataValues.password;
    }
    return { ...user.get(), roles: user.roles.map(role => role.get().name) };
  }

  /**
   * Retrieve user by email
   * @param {string} email - User email
   * @returns {Promise} - Returns
   */
  static async getByEmail(email) {
    const user = await User.findOne({ where: { email } });
    if (user && user.get()) {
      delete user.dataValues.password;
    }
    return user;
  }

  /**
   * Create the user account
   * @param {object} data data containing user information(firstName:str, middleName:str, lastName:str, email:str, password:str, etc)
   * @param {object} user - current user information
   * @returns {string|object} user payload
   */
  static async update(data, {language }) {
    try {
      const result = await User.update(data, {
        where: { email: data.email },
        returning: true,
      });

      if (!result || !result[1][0]) {
        throw new ApolloError(USER_NOT_FOUND(language), HTTP_NOT_FOUND);
      }

      return result[1][0];
    } catch (err) {
      const { message, code, errors } = errorHandler(err, language);
      throw new ApolloError(message, code, errors);
    }
  }
  
  
  /**
   * Delete user
   * @param {string} userId - the Id of the user
   * @param {bool} force - whether to perform a hard delete or not
   * @returns {Promise} - Returns
   */
  static async delete({ userId, force = false }, { language }) {
    try {
      const deleted = await User.destroy({
        where: { id: userId },
        force,
      });

      if (!deleted) {
        throw new ApolloError(
          `${translate('User')} ${NOT_DELETED(language)}`,
          HTTP_NOT_FOUND,
        );
      }

      return `${translate('User')} ${SUCCESSFULLY_DELETED(language)}`;
    } catch (error) {
      const { message, code, errors } = errorHandler(error, language);
      throw new ApolloError(message, code, errors);
    }
  }

  // =======================Will be implemented in future========

  /**
   * @description method to activate user account
   * @param {string} token
   * @param {object} context
   * @returns {Promise} - Returns
   */
  static async activate(token, { language }) {
    try {
      const decodedToken = decodeToken(token);

      if (decodedToken.error || !decodedToken) {
        throw new AuthenticationError(INVALID_TOKEN(language));
      }
      const result = await User.update(
        { emailVerified: true },
        {
          where: { email: decodedToken.email },
          returning: true,
        },
      );

      if (!result || !result[1][0].emailVerified) {
        throw new AuthenticationError(ACCOUNT_NOT_VERIFIED(language));
      }

      return {
        message: ACCOUNT_VERIFIED(language),
      };
    } catch (e) {
      const { message, code, errors } = errorHandler(e, language);
      throw new ApolloError(message, code, errors);
    }
  }

  /**
   * forget user password
   * @param {string} email user email
   * @returns {Promise} - Returns
   */
  static async forgotPassword(email, { language }) {
    const findUser = await User.findOne({ where: { email } });
    if (!findUser) {
      return {
        message: SUCCESS_TO_RESET_PASSWORD(language),
      };
    }

    try {
      const payload = {
        id: findUser.dataValues.id,
        lastName: findUser.dataValues.lastName,
        email: findUser.dataValues.email,
      };
      // form a token
      // const { lastName } = findUser.dataValues;
      const token = generateToken(payload, { expiresIn: '24h' });
      return {
        token,
        message: SUCCESS_TO_RESET_PASSWORD(language),
      };
    } catch (error) {
      const { message, code, errors } = errorHandler(error, language);
      throw new ApolloError(message, code, errors);
    }
  }

  /**
   * reset user password
   * @param {object} data (token, password and confirmPassword)
   * @param {object} context
   * @returns {Promise} - Returns
   */
  static async resetPassword(
    { token, password, confirmPassword },
    { language },
  ) {
    const tokenValues = decodeToken(token);
    try {
      if (password !== confirmPassword) {
        throw new ApolloError(PASSWORD_NOT_MATCH(language));
      }
      const hashedPassword = await hashPassword(password);
      const findUser = await User.findOne({ where: { id: tokenValues.id } });
      if (!findUser) throw new UserInputError(USER_NOT_FOUND(language));

      await User.update(
        { password: hashedPassword },
        { where: { id: findUser.dataValues.id } },
      );
      return {
        message: SUCCESS_PASSWORD_RESET(language),
      };
    } catch (error) {
      const { message, code, errors } = errorHandler(error, language);
      throw new ApolloError(message, code, errors);
    }
  }

  /**
   * change user password
   * @param {object} data (password and newPassword)
   * @param {object} context
   * @returns {Promise} - Returns
   */
  static async changePassword({ password, newPassword }, { user }) {
    try {
      const isCurrentPasswordCorrect = await user.comparePassword(password);

      if (!isCurrentPasswordCorrect) {
        throw new ApolloError(PASSWORD_NOT_MATCH(user.language));
      }

      const hashedPassword = await hashPassword(newPassword);

      await user.update({ password: hashedPassword });

      return {
        message: SUCCESS_PASSWORD_RESET(user.language),
        token: generateToken({ id: user.id, email: user.email }),
      };
    } catch (error) {
      const { message, code, errors } = errorHandler(error, user.language);
      throw new ApolloError(message, code, errors);
    }
  }
}
