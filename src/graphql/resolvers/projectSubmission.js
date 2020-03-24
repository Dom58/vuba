import isAuth from '../../helpers/isAuth';
import ProjectController from '../../controllers/ProjectController';

export default {
  Query: {
    getProjects: async (parent, args, context) => {
      const { user } = context;
      isAuth(user);

      return ProjectController.getProjects(args, context);
    },
    getProject: async (parent, args, context) => {
      const { user } = context;
      isAuth(user);
      return ProjectController.getProject(args, context);
    },
  },

  Mutation: {
    createProject: (parent, { data }, context) => {
      return ProjectController.createProject(data, context);
    },
    deleteProject: (parent, { id } , context) => {
      return ProjectController.deleteProject(id, context);
    },
    updateProject: (parent, { data }, context) => {
      isAuth(context.user);
      return ProjectController.updateProject(data, context);
    },
  },
};
