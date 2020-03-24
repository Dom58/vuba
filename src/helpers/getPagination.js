import { LIMIT } from 'constants/db';

export default (page, perPage) => ({
  limit: perPage || LIMIT,
  offset: LIMIT * ((page || 1) - 1),
});
