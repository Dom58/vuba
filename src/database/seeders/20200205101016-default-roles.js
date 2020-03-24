const data = require('../seeders-data/default-roles');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('roles', data, {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('roles', null, {});
  },
};
