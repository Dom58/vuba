import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getProjects(page: Int, perPage: Int): ProjectsList
    getProject(id: ID): Project
  }

  extend type Mutation {
    createProject(data: ProjectSubmissionInput!): Project!
    deleteProject(id: ID!): String
    updateProject(data: UpdateProjectInput!): Project!
  }

  type Project {
    id: ID
    fullName: String
    telephone: String
    email: String
    projectName: String
    companyName: String
    category_id: Int
    category: ProjCategory
    companyAddress: String
    body: String
    createdAt: Date
    updatedAt: Date
  }

  type ProjectsList {
    data: [Project]
    meta: Meta
  }

  input ProjectSubmissionInput {
    fullName: String!
    telephone: String!
    email: String
    projectName: String
    companyName: String
    category_id: Int
    companyAddress: String
    body: String!
  }

  input UpdateProjectInput {
    fullName: String
    telephone: String
    email: String
    projectName: String
    companyName: String
    body: String
  }

  type ProjCategory {
    id: Int
    name: String
    value: String
    description: String
  }
`;
