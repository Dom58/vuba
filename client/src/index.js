import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import {createHttpLink} from 'apollo-link-http'
import { createUploadLink } from 'apollo-upload-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { I18nextProvider } from 'react-i18next';
import './index.css';
import App from './App';
import { BACKEND_GRAPHQL_API_URL } from './utils/constants';
import i18n from './utils/translations';

/**
 * This httpLink will enable us to upload the image and audio
 * with the help of apollo-upload-client package
 */

const httpLink = createUploadLink({
  uri: `${BACKEND_GRAPHQL_API_URL}/api/`,
  headers: {
    token: localStorage.getItem('token'),
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </ApolloProvider>,
  document.querySelector('#root'),
);
