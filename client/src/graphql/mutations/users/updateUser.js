import gql from 'graphql-tag';

export const UPDATE_USER_PROFILE = gql`
  mutation updateUser(
    $email: String
    $avatar: String
    $firstName: String
    $middleName: String
    $lastName: String
    $gender: String
    $phoneNumber: String
    $bio: String
    $role: String
  ) {
    updateUser(
      data: {
        firstName: $firstName
        lastName: $lastName
        middleName: $middleName
        phoneNumber: $phoneNumber
        email: $email
        gender: $gender
        bio: $bio
        avatar: $avatar
        role: $role
      }
    ) {
      id
      email
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
