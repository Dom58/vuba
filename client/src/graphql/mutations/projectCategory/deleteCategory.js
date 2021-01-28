import gql from 'graphql-tag';

export const DELETE_CATEGORY = gql`
  mutation deleteProjectCategory($id: ID!) {
    deleteProjectCategory(id: $id) {
      message
    }
  }
`;
