import gql from 'graphql-tag';

export const CREATE_USER = gql`
  mutation createUser(
    $fullName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      data: {
        fullName: $fullName
        email: $email
        password: $password
      }
    ) {
      token
      message
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
