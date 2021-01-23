import { ApolloError } from 'apollo-server';
import { ProjectCategory } from '../database/models';
import errorHandler from '../helpers/errorHandler';
import { HTTP_NOT_FOUND } from '../constants/httpStatusCodes';
import { SUCCESSFULLY_DELETED } from '../constants/successMessages';
import { CATEGORY_NOT_FOUND } from '../constants/errorMessages';
import { createSlug } from '../helpers/createSlug';

/**
 * Project Controller
 */
export default class ProjectCategoryController {

  /**
   * Create the project
   * @param {object} data data containing project information(firstName:str, middleName:str, lastName:str, email:str, password:str)
   * @returns {string|object} project payload
   */
  static async createProjectCategory(data, { language }) {
    try {
      const newData = {
        ...data,
        value: createSlug(data.name),
      }

      const projectCategory = await ProjectCategory.create(newData);
      return projectCategory;

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
 static async getProjectCategories() {

  const projectCategories = await ProjectCategory.findAll({
    order: [['createdAt', 'DESC']],
  });
  
  return { data: projectCategories };
}

/**
 * delete projectCategory by id
 * @param {object} id - projectCategory id
 * @returns {Promise} - Returns
*/
static async deleteProjectCategory( id, { language }) {
  try {
    const findCategory = await ProjectCategory.findOne({ where: { id } });

    if (!findCategory) {
        throw new ApolloError(CATEGORY_NOT_FOUND(language), HTTP_NOT_FOUND);
    }

    await ProjectCategory.destroy({ where: { id } });
    return SUCCESSFULLY_DELETED(language);
  } catch (err) {
    const error = errorHandler(err, language);
    throw new ApolloError(error.message, error.code, error);
  }
}

/**
 * delete projectCategory by id
 * @param {object} id - projectCategory id
 * @returns {Promise} - Returns
*/
static async updateProjectCategory( data, { language }) {
  try {
    const result = await ProjectCategory.update(data, {
      where: { id: data.id },
      returning: true,
    });

    if (!result || !result[1][0]) {
      throw new ApolloError(CATEGORY_NOT_FOUND(language), HTTP_NOT_FOUND);
    }

    return result[1][0];
  } catch (err) {
    const { message, code, errors } = errorHandler(err, language);
    throw new ApolloError(message, code, errors);
  }
}

}
