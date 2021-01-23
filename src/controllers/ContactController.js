import { ApolloError } from 'apollo-server';
import { Contact } from '../database/models';
import errorHandler from '../helpers/errorHandler';
import { HTTP_NOT_FOUND } from '../constants/httpStatusCodes';
import { SUCCESSFULLY_DELETED } from '../constants/successMessages';
import { CONTACT_NOT_FOUND } from '../constants/errorMessages';

/**
 * Project Controller
 */
export default class ContactController {

  /**
   * Create the project
   * @param {object} data data containing project information(firstName:str, middleName:str, lastName:str, email:str, password:str)
   * @returns {string|object} project payload
   */
  static async createContact(data, { language }) {
    try {
      const contact = await Contact.create(data);
      return contact;

    } catch (err) {
      const error = errorHandler(err, language);
      throw new ApolloError(error.message, error.code, error);
    }
  }

  /**
   * fetch all Submitted Project
   * @param {object} args - the query arguments
   * @returns {Promise} - Returns
  */
 static async getContacts() {

  const contacts = await Contact.findAll({
    order: [['createdAt', 'DESC']],
  });
  
  return { data: contacts };
}

/**
 * delete contact by id
 * @param {object} id - contact id
 * @returns {Promise} - Returns
*/
static async deleteContact( id, { language }) {
  try {
  const findContact = await Contact.findOne({ where: { id } });

  if (!findContact) {
      throw new ApolloError(CONTACT_NOT_FOUND(language), HTTP_NOT_FOUND);
  }

  await Contact.destroy({ where: { id } });
  return SUCCESSFULLY_DELETED(language);

  } catch (err) {
  const error = errorHandler(err, language);
  throw new ApolloError(error.message, error.code, error);
  }
}

  
}
