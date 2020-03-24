import dotenv from 'dotenv';

dotenv.config();

export const BACKEND_GRAPHQL_API_URL = `${process.env.REACT_APP_BACK_END_URL}`;
