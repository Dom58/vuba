import gql from 'graphql-tag';

export const SUBMIT_PROJECT = gql`
  mutation createProject(
    $fullName: String!
    $telephone: String!
    $category_id: Int!
    $companyAddress: String
    $email: String!
    $projectName: String!
    $companyName: String
    $body: String!
  ) {
    createProject(
      data: {
        fullName: $fullName
        telephone: $telephone
        category_id: $category_id
        companyAddress: $companyAddress
        email: $email
        projectName: $projectName
        companyName: $companyName
        body: $body
      }
    ) {
      id
      fullName
      telephone
      email
      projectName
      companyName
      companyAddress
      category_id
      body
      createdAt
      updatedAt
    }
  }
`;
