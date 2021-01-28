import gql from 'graphql-tag';

export const GET_CATEGORY = gql`
  query getProjectCategory($id: ID!){
    getProjectCategory(id: $id){
      id
      name
      value
      description
      createdAt
      updatedAt
    }
  }
`;
