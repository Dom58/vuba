import gql from 'graphql-tag';

export const GET_USERS = gql`
  query {
    users {
      data {
        id
        email
        avatar
        fullName
        gender
        role
        roles
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
