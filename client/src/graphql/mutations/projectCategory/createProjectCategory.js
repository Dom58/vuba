import gql from 'graphql-tag';

export const CREATE_CPROJECT_CATEGORY = gql`
  mutation createProjectCategory(
    $name: String!
    $description: String
  ) {
    createProjectCategory(
      data: {
        name: $name
        description: $description
      }
    ) {
      id
      name
      description
      value
      createdAt
      updatedAt
    }
  }
`;
