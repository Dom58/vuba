import gql from 'graphql-tag';

export const GET_CONTACTS = gql`
  query {
    getContacts {
      data {
        id
        fullName
        telephone
        email
        subject
        body
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
