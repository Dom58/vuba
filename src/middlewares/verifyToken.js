import { HTTP_UNAUTHORIZED } from 'constants/httpStatusCodes';
import { NOT_SIGNED_IN, INVALID_TOKEN } from 'constants/errorMessages';
import { decode as decodeToken } from '../utils/tokens';

export default async (req, res, next) => {
  const token = req.headers['access-token'] || req.params.token || null;

  if (!token) {
    return res
      .status(HTTP_UNAUTHORIZED)
      .json({ code: HTTP_UNAUTHORIZED, errors: { auth: NOT_SIGNED_IN } });
  }

  const decodedToken = decodeToken(token);

  if (decodedToken.errors || !decodedToken) {
    return res
      .status(HTTP_UNAUTHORIZED)
      .json({ code: HTTP_UNAUTHORIZED, errors: { auth: INVALID_TOKEN } });
  }

  req.user = decodedToken;

  return next();
};
