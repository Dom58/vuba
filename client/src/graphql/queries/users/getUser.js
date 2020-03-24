import gql from 'graphql-tag';

export const GET_USER_PROFILE = gql`
  query getUser($id: ID, $email: String) {
    getUser(id: $id, email: $email) {
      id
      email
      avatar
      firstName
      middleName
      lastName
      gender
      phoneNumber
      role
      username
      bio
      roles
      createdAt
      updatedAt
    }
  }
`;
