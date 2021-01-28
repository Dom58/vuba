import { isAdmin } from '../../helpers/isAuth';
import ProjectCategoryController from '../../controllers/ProjectCategoryController';

export default {
  Query: {
    getProjectCategories: async (parent, args, context) => {
    //   const { user } = context;
    //   isAuth(user);

      return ProjectCategoryController.getProjectCategories(args, context);
    },
    getProjectCategory: async (parent, {id}, context) => {
    //   const { user } = context;
    //   isAuth(user);
      return ProjectCategoryController.getProjectCategory(id, context);
    },
  },

  Mutation: {
    createProjectCategory: (parent, { data }, context) => {
        const { user } = context;
        isAdmin(user);
      return ProjectCategoryController.createProjectCategory(data, context);
    },
    deleteProjectCategory: (parent, { id } , context) => {
        const { user } = context;
        isAdmin(user);
      return ProjectCategoryController.deleteProjectCategory(id, context);
    },
    updateProjectCategory: (parent, { data }, context) => {
        const { user } = context;
        isAdmin(context.user);
      return ProjectCategoryController.updateProjectCategory(data, context);
    },
  },
};
