import gql from 'graphql-tag';

export const UPDATE_CATEGORY = gql`
  mutation updateProjectCategory(
    $id: ID
    $name: String
    $description: String
    $createdAt: Date
  ) {
    updateProjectCategory(
      data: {
        id: $id
        name: $name
        description: $description
        createdAt: $createdAt
      }
    ) {
      id
      name
      value
      description
      createdAt
      updatedAt
    }
  }
`;
