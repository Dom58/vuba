import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(data: { email: $email, password: $password }) {
      token
      user {
        id
        email
        fullName
        gender
        role
        bio
        roles
        createdAt
        updatedAt
      }
    }
  }
`;
