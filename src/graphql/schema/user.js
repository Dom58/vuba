import { gql } from 'apollo-server-express';

export default gql`
  scalar Date
  extend type Query {
    users(page: Int, perPage: Int): UsersList
    getUser(id: ID, email: String): User
    me: User
  }

  extend type Mutation {
    createUser(data: UserSignUpInput!): AuthResponse!
    activateUser(token: String!): Message!
    loginUser(data: UserLoginInput!): AuthResponse!
    deleteUser(userId: ID!): String
    updateUser(data: UpdateUserInput!): User!
    forgotPassword(email: String!): Message!
    resetPassword(
      token: String!
      password: String!
      confirmPassword: String!
    ): Message!
    changePassword(password: String!, newPassword: String!): Message!
  }

  type User {
    id: ID
    email: String
    avatar: String
    fullName: String
    gender: String
    role: String
    bio: String
    roles: [String]
    createdAt: Date
    updatedAt: Date
  }

  type UsersList {
    data: [User]
    meta: Meta
  }

  type AuthResponse {
    user: User!
    token: String!
    message: String!
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  input UserSignUpInput {
    fullName: String!
    email: String!
    avatar: String
    gender: String
    bio: String
    password: String!
  }

  input UpdateUserInput {
    email: String
    avatar: String
    fullName: String
    gender: String
    phoneNumber: String
    bio: String
    role: String
  }

  type Message {
    message: String
    token: String
  }
`;
