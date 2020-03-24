import {
  HTTP_EXIST,
  HTTP_SERVER_ERROR,
  HTTP_BAD_REQUEST,
} from 'constants/httpStatusCodes';
import { CONFLICT, UNEXPECTED_ERROR } from 'constants/errorMessages';

/**
 * @param {object} err
 * @param {string} language
 * @returns {object} an object containing descriptive error messages
 */
export default (err = {}, language) => {
  const errors = {};
  switch (err.name) {
    case 'SequelizeUniqueConstraintError':
      Object.keys(err.fields).forEach(key => {
        errors[key] = `${key} "${err.fields[key]}" ${CONFLICT(language)}`;
      });
      return { code: HTTP_EXIST, message: err.message, errors };
    case 'SequelizeValidationError':
      err.errors.forEach(error => {
        errors[error.path] = error.message;
      });
      return { code: HTTP_BAD_REQUEST, message: err.message, errors };
    case 'SequelizeBulkRecordError':
      err.errors.errors.forEach(error => {
        errors[error.path] = error.message;
      });
      return { code: HTTP_BAD_REQUEST, message: err.message, errors };
    default:
      return {
        code: (err.extensions && err.extensions.code) || HTTP_SERVER_ERROR,
        message: err.message || UNEXPECTED_ERROR(language),
      };
  }
};
