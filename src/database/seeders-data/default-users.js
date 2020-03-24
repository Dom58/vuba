const dotenv = require('dotenv');
const moment = require('moment');
const bcrypt = require('bcryptjs');

dotenv.config();

const createdAt = moment('2019-11-18').format();
const updatedAt = createdAt;
const password = bcrypt.hashSync('12345', 10);
const status = 'active';

const { DEFAULT_ADMIN_PHONE, DEFAULT_ADMIN_EMAIL } = process.env;

module.exports = [
  {
    id: 10000,
    phoneNumber: DEFAULT_ADMIN_PHONE || '250781000001',
    password,
    email: DEFAULT_ADMIN_EMAIL || 'muhirwafiston1@gmail.com',
    firstName: 'Admin',
    lastName: 'Fiston',
    emailVerified: true,
    status,
    createdAt,
    updatedAt,
  },
];
