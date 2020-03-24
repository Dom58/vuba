import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import createError from 'http-errors';
import express from 'express';
import DataLoader from 'dataloader';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';

import schema from './src/graphql/schema';
import resolvers from './src/graphql/resolvers';
import loaders from './src/graphql/loaders';
import { HTTP_SERVER_ERROR, HTTP_NOT_FOUND } from './src/constants/httpStatusCodes';
import decodeTokenUser from './src/helpers/decodeTokenUser';

const { GRAPH_QL_URL } = process.env;

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export const apolloServerConfig = {
  introspection: true,
  playground: true,
  typeDefs: schema,
  resolvers,
  formatError: error => {
    /**
     * remove the internal sequelize error message
     * leave only the important validation error
     */

    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message,
    };
  },
  context: async ({ req }) => {
    const user = await decodeTokenUser(req);
    return {
      user,
      loaders: {
        user: new DataLoader(keys => loaders.user.batchUsers(keys)),
      },
      req,
      language:
        (user && user.language) || (req && req.headers && req.headers.language),
    };
  },
};
const apolloServer = new ApolloServer(apolloServerConfig);

apolloServer.applyMiddleware({ app, path: GRAPH_QL_URL || '/api' });

if (process.env.NODE_ENV==='production') {
	app.use(express.static('client/build'));
	app.get('*',(req, res)=>{
		res.sendFile(path.resolve(__dirname,'client','build','index.html'));
	})
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(HTTP_NOT_FOUND));
});


// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || HTTP_SERVER_ERROR);
  res.send({
    message: err.message,
    error: err.status,
  });
  next();
});

export { apolloServer };

export default app;
