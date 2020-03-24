const data = require('../seeders-data/default-users');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('users', data, {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
