import slug from 'slug';
import uniqid from 'uniqid';

export const createSlug = chassin => {
  const newSlug = `${slug(chassin, { lower: true })}-${uniqid.process()}`;
  return newSlug;
};
