import gql from 'graphql-tag';

export const GET_PROGECTS = gql`
  query {
    getProjects {
      data {
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
      meta {
        page
        perPage
        total
      }
    }
  }
`;
