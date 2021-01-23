export default {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'project_submitions', 
        'companyAddress', {
        allowNull: true,
        type: Sequelize.STRING,
      }),

      queryInterface.addColumn(
        'project_submitions', 
        'category_id', {
        allowNull: true,
        type: Sequelize.INTEGER,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'project_submitions', 
        'companyAddress'
      ),
      queryInterface.removeColumn(
        'project_submitions', 
        'category_id'
      ),
    ]);
  }
};
