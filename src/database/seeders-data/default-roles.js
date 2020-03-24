const moment = require('moment');

const createdAt = moment('2019-11-18').format();
const updatedAt = createdAt;

module.exports = [
  {
    id: 10000,
    name: 'admin',
    description: 'Admin User',
    createdAt,
    updatedAt,
  },
];
