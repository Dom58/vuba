import gql from 'graphql-tag';

export const GET_CATEGORIES = gql`
  query {
    getProjectCategories {
      data {
        id
        name
        value
        description
        createdAt
        updatedAt
      }
      meta {
        page
        perPage
        total
      }
    }
  }
`;
