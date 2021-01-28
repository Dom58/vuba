import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getProjectCategories(page: Int, perPage: Int): ProjectCategoryList
    getProjectCategory(id: ID): ProjectCategory
  }

  extend type Mutation {
    createProjectCategory(data: ProjectCategoryInput!): ProjectCategory!
    deleteProjectCategory(id: ID!): Message
    updateProjectCategory(data: UpdateProjectCategoryInput!): ProjectCategory!
  }

  type ProjectCategory {
    id: ID
    name: String
    value: String
    description: String
    createdAt: Date
    updatedAt: Date
  }

  type ProjectCategoryList {
    data: [ProjectCategory]
    meta: Meta
  }

  input ProjectCategoryInput {
    name: String!
    description: String
  }

  input UpdateProjectCategoryInput {
    id: ID
    name: String
    description: String
    createdAt: Date
  }
`;
