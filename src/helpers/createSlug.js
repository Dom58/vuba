import slug from 'slug';
import uniqid from 'uniqid';

export const createSlug = name => {
  const newSlug = `${slug(name, { lower: true })}-${uniqid.process()}`;
  return newSlug;
};
