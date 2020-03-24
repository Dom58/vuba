const data = require('../seeders-data/default-users-roles');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('users_roles', data, {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users_roles', null, {});
  },
};
