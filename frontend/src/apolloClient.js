import {
  ApolloClient,
  InMemoryCache,
  HttpLink
} from "@apollo/client";
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client'
import {
  GRAPHQL_URL
} from './utils/variables';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const httpLink = createHttpLink({
  uri: `${GRAPHQL_URL}/graphql`,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default client;
