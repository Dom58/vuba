export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'deletedAt', {
      allowNull: true,
      type: Sequelize.DATE,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'deletedAt');
  },
};
