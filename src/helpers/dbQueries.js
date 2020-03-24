import { LIMIT, OFFSET } from 'constants/db';

export const findOne = async ({ model, where = {}, include }) =>
  model.findOne({
    where,
    include,
  });

export const findAll = async ({
  model,
  where,
  limit = OFFSET,
  offset = LIMIT,
  include,
}) =>
  model.findAll({
    offset,
    limit,
    where,
    include,
  });

export const createOne = async ({ model, data = {} }) => model.create(data);

export const deleteOne = async ({ model, where }) =>
  model.destroy({
    where,
  });

export const update = async ({ model, data = {}, where = {} }) =>
  model.update(data, { where, returning: true });
