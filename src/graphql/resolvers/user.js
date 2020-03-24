import isAuth from '../../helpers/isAuth';
import UserController from '../../controllers/UserController';

export default {
  Query: {
    me: async (parent, _, context) => {
      const { user } = context;
      isAuth(user);

      return UserController.getOne({ id: user.get().id }, context);
    },
    users: async (parent, args, context) => {
      const { user } = context;
      isAuth(user);

      return UserController.getAll(args, context);
    },
    getUser: async (parent, args, context) => {
      const { user } = context;
      isAuth(user);

      return Object.keys(args).length
        ? UserController.getOne(args, context)
        : UserController.getOne({ id: user.id }, context);
    },
  },

  Mutation: {
    createUser: (parent, { data }, context) => {
      return UserController.create(data, context);
    },
    loginUser: (parent, { data }, context) => {
      return UserController.login(data, context);
    },
    updateUser: (parent, { data }, context) => {
      isAuth(context.user);
      return UserController.update(data, context);
    },
    deleteUser: (parent, { userId, force }, context) => {
      isAuth(context.user);

      return UserController.delete({ userId, force }, context);
    },

    // Not yet implemented but will be implemented in future
    activateUser: (parent, { token }, context) => {
      return UserController.activate(token, context);
    },
    forgotPassword: (parent, { email }, context) => {
      return UserController.forgotPassword(email, context);
    },
    resetPassword: (parent, { token, password, confirmPassword }, context) => {
      return UserController.resetPassword(
        { token, password, confirmPassword },
        context,
      );
    },
    changePassword: (parent, { password, newPassword }, context) => {
      isAuth(context.user);

      return UserController.changePassword({ password, newPassword }, context);
    },
  },
};
