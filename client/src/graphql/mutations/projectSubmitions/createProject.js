import gql from 'graphql-tag';

export const SUBMIT_PROJECT = gql`
  mutation createProject(
    $fullName: String!
    $telephone: String!
    $email: String!
    $projectName: String!
    $companyName: String
    $body: String!
  ) {
    createProject(
      data: {
        fullName: $fullName
        telephone: $telephone
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
      body
      createdAt
      updatedAt
    }
  }
`;
