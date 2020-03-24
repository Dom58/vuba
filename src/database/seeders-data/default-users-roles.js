const moment = require('moment');

const createdAt = moment('2019-11-18').format();
const updatedAt = createdAt;

module.exports = [
  {
    id: 1,
    userId: 10000,
    roleId: 1,
    createdAt,
    updatedAt,
  },
];
