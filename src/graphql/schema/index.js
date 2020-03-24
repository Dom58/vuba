import { gql } from 'apollo-server-express';

import userSchema from './user';
import projectSubmissionSchema from './projectSubmission';
import contactSchema from './contact';

const generalSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
  type Meta {
    page: Int
    total: Int
    perPage: Int
  }
  enum Gender {
    male
    female
    other
  }
`;

export default 
[
  generalSchema, 
  userSchema, 
  projectSubmissionSchema,
  contactSchema,
  
];
