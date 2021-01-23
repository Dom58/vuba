import { isAuth } from '../../helpers/isAuth';
import ContactController from '../../controllers/ContactController';

export default {
  Query: {
    getContacts: async (parent, args, context) => {
      const { user } = context;
      isAuth(user);

      return ContactController.getContacts(args, context);
    },
    getContact: async (parent, args, context) => {
      const { user } = context;
      isAuth(user);
      return ContactController.getContact(args, context);
    },
  },

  Mutation: {
    createContact: (parent, { data }, context) => {
      return ContactController.createContact(data, context);
    },
    deleteContact: (parent, { id } , context) => {
      return ContactController.deleteContact(id, context);
    },
    updateContact: (parent, { data }, context) => {
      isAuth(context.user);
      return ContactController.updateContact(data, context);
    },
  },
};
