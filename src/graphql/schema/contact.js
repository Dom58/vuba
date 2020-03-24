import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getContacts(page: Int, perPage: Int): ContactsList
    getContact(id: ID): Contact
  }

  extend type Mutation {
    createContact(data: ContactInput!): Contact!
    deleteContact(id: ID!): String
    updateContact(data: UpdateContactInput!): Contact!
  }

  type Contact {
    id: ID
    fullName: String
    telephone: String
    email: String
    subject: String
    body: String
    createdAt: Date
    updatedAt: Date
  }

  type ContactsList {
    data: [Contact]
    meta: Meta
  }

  input ContactInput {
    fullName: String!
    telephone: String!
    email: String
    subject: String
    body: String
  }

  input UpdateContactInput {
    fullName: String
    telephone: String
    email: String
    subject: String
    body: String
  }
`;
