import gql from 'graphql-tag';

export const CREATE_CONTACT = gql`
  mutation createContact(
    $fullName: String!
    $telephone: String!
    $email: String!
    $subject: String!
    $body: String
  ) {
    createContact(
      data: {
        fullName: $fullName
        telephone: $telephone
        email: $email
        subject: $subject
        body: $body
      }
    ) {
      id
      fullName
      telephone
      email
      subject
      body
      createdAt
      updatedAt
    }
  }
`;
