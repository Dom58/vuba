import bcrypt from 'bcryptjs';

export const hashPassword = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8));

export const comparePassword = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);
