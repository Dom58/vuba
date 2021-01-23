import { ApolloError } from 'apollo-server';
import { ProjectSubmition, ProjectCategory } from '../database/models';
import errorHandler from '../helpers/errorHandler';
import { HTTP_NOT_FOUND } from '../constants/httpStatusCodes';
import { SUCCESSFULLY_DELETED } from '../constants/successMessages';
import { PROJECT_NOT_FOUND } from '../constants/errorMessages';
import { projectSubmitionUrl } from '../helpers/mailer/projectSubmition';


/**
 * Project Controller
 */
export default class ProjectController {
  /**
   * Create the project
   * @param {object} data data containing project information(firstName:str, middleName:str, lastName:str, email:str, password:str)
   * @returns {string|object} project payload
   */
  static async createProject(data, { language }) {
    try {
      const project = await ProjectSubmition.create(data);

      const { email, fullName, telephone, projectName } = data;
      await projectSubmitionUrl(email, fullName, telephone, projectName);

      return project;

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
  static async getProjects() {

    const projects = await ProjectSubmition.findAll({
      order: [['createdAt', 'DESC']],
      include:[
        {
            as:"category",
            model: ProjectCategory,
            attributes:["id", "name", "value", "description"]
        }
    ]
    });
    
    return { data: projects };
  }

  /**
   * delete project by id
   * @param {object} id - project id
   * @returns {Promise} - Returns
  */
  static async deleteProject( id, { language }) {
    try {
    const findProject = await ProjectSubmition.findOne({ where: { id } });

    if (!findProject) {
        throw new ApolloError(PROJECT_NOT_FOUND(language), HTTP_NOT_FOUND);
    }

    await ProjectSubmition.destroy({ where: { id } });
    return SUCCESSFULLY_DELETED(language);

    } catch (err) {
    const error = errorHandler(err, language);
    throw new ApolloError(error.message, error.code, error);
    }
  }

}
